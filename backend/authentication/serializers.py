import logging
from typing import Dict, Any
from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import check_password
from django.contrib.auth import authenticate
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer as SimpleJWTTokenObtainPairSerializer
from .models import Cart, CartItem, Wishlist, BillingAddress
from core.models import Order, OrderItem, Product

User = get_user_model()


class UserSerializer:
    class UserCreateSerializer(serializers.ModelSerializer):
        class Meta:
            model = User
            fields = (
                "email",
                # "first_name",
                # "last_name",
                "password",
            )

        def validate(self, attrs):
            return super().validate(attrs)
        
        def create(self, validated_data):
            user = User.objects.create_user(**validated_data)
            return user

    class UserRetrieveSerializer(serializers.ModelSerializer):

        fullname = serializers.SerializerMethodField()

        class Meta:
            model = User
            fields = (
                "created_at",
                "fullname",
                "email",
                "first_name",
                "last_name",
                "username",
                "id",
            )
        
        def get_fullname(self, obj):
            return obj.fullname

    class ResetPasswordRequestSerializer(serializers.Serializer):
        email = serializers.EmailField(required=True)

    class ResetPasswordComplete(serializers.Serializer):
        token = serializers.CharField(required=True)
        new_password = serializers.CharField(write_only=True, required=True)

        def validate_new_password(self, value):
            from django.contrib.auth.password_validation import validate_password
            validate_password(value)
            return value

        def validate(self, data):
            token = data.get("token")

            # Decode user ID from the token
            try:
                user_id, token = token.split(":", 1)
                
                user = User.objects.get(id=user_id)
            except (ValueError, User.DoesNotExist):
                raise serializers.ValidationError({"token": "Invalid token."})

            # Validate the token
            token_generator = PasswordResetTokenGenerator()
            if not token_generator.check_token(user, token):
                raise serializers.ValidationError(
                    {"token": "Invalid or expired token."})

            self.user = user
            return data

        def save(self):
            """
            Updates the user's password.
            """
            self.user.set_password(self.validated_data["new_password"])
            self.user.save()

    class ChangePasswordSerializer(serializers.Serializer):
        old_password = serializers.CharField(required=True, write_only=True)
        new_password = serializers.CharField(required=True, write_only=True)

        def validate_new_password(self, value):
            from django.contrib.auth.password_validation import validate_password
            validate_password(value)
            return value
    
        def validate(self, attrs):
            user = self.context['request'].user
            old_password = attrs.get('old_password')

            is_password_valid = check_password(old_password, user.password)
            
            if not is_password_valid: 
                raise serializers.ValidationError({"old_password": "Invalid password."})
        
            return super().validate(attrs)
    
        def create(self, validated_data):
            """
            Updates the user's password.
            """
            user = self.context['request'].user
            user.set_password(self.validated_data["new_password"])
            user.save()
            return user


class LoginUserSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(write_only=True)
    
    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect credentials!")


class CartItemSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source="product.name", read_only=True)
    product_price = serializers.DecimalField(source="product.price", max_digits=10, decimal_places=2, read_only=True)
    total_price = serializers.SerializerMethodField()

    class Meta:
        model = CartItem
        fields = ["id", "product", "product_name", "product_price", "quantity", "total_price"]

    def get_total_price(self, obj):
        return obj.total_price()


class CartSerializer(serializers.ModelSerializer):
    cart_items = CartItemSerializer(many=True, read_only=True)
    total_price = serializers.SerializerMethodField()

    class Meta:
        model = Cart
        fields = ["id", "user", "cart_items", "total_price"]

    def get_total_price(self, obj):
        return obj.total_price()
    

class WishlistSerializer(serializers.ModelSerializer):
    id = serializers.CharField(read_only=True)
    product_name = serializers.CharField(source="product.name", read_only=True)
    product_price = serializers.DecimalField(source="product.price", max_digits=10, decimal_places=2, read_only=True)
    in_stock = serializers.SerializerMethodField()

    class Meta:
        model = Wishlist
        fields = ["id", "user", "product", "product_name", "product_price", "in_stock"]

    def get_in_stock(self, obj):
        return True if obj.product.sku > 0 else False


class OrderItemSerializer(serializers.ModelSerializer):
    product_name = serializers.ReadOnlyField(source="product.name")
    
    class Meta:
        model = OrderItem
        fields = ["id", "product", "product_name", "quantity", "price"]


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    status = serializers.ChoiceField(choices=Order.STATUS_CHOICES, required=False)
    
    class Meta:
        model = Order
        fields = ["id", "user", "billing_address", "total_price", "status", "created_at", "updated_at", "items"]
        read_only_fields = ["user", "total_price", "created_at", "updated_at"]

    def create(self, validated_data):
        request = self.context.get("request")
        user = request.user if request else None
        order = Order.objects.create(user=user, **validated_data)
        return order


class CreateOrderSerializer(serializers.Serializer):
    product_items = serializers.ListField(
        child=serializers.DictField(
            child=serializers.IntegerField()
        )
    )  # Expected format: [{"product": 1, "quantity": 2}, {"product": 2, "quantity": 1}]
    billing_address = serializers.PrimaryKeyRelatedField(queryset=BillingAddress.objects.all())

    def validate_product_items(self, value):
        for item in value:
            if "product" not in item or "quantity" not in item:
                raise serializers.ValidationError("Each item must contain 'product' and 'quantity'.")
            if not Product.objects.filter(id=item["product"]).exists():
                raise serializers.ValidationError(f"Product ID {item['product']} does not exist.")
        return value

    def create(self, validated_data):
        user = self.context['request'].user
        billing_address = validated_data['billing_address']
        order = Order.objects.create(user=user, billing_address=billing_address, total_price=0)

        total_price = 0
        for item in validated_data['product_items']:
            product = Product.objects.get(id=item["product"])
            quantity = item["quantity"]
            price = product.price * quantity
            OrderItem.objects.create(order=order, product=product, quantity=quantity, price=price)
            total_price += price
        
        order.total_price = total_price
        order.save()
        return order


class UpdateBillingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = BillingAddress
        fields = ["id", "street", "city", "state", "postal_code", "country"]

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance


class TokenObtainSerializer(SimpleJWTTokenObtainPairSerializer):
 
     def validate(self, attrs: Dict[str, Any]):
 
         data = super().validate(attrs)
         user = self.user
         user_data = UserSerializer.UserRetrieveSerializer(user).data
         data['data'] = user_data
         return data