import logging
from rest_framework import permissions
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import viewsets, permissions, status
from rest_framework.views import APIView
from rest_framework.decorators import action
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.conf import settings
from django.db import transaction
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework_simplejwt.exceptions import InvalidToken
from rest_framework_simplejwt.views import TokenObtainPairView as SimpleJWTTokenObtainPairView

from .models import Wishlist, Cart, CartItem
from .serializers import UserSerializer, WishlistSerializer, LoginUserSerializer, CartSerializer, CartItemSerializer, OrderItemSerializer, OrderSerializer, UpdateBillingAddressSerializer, CreateOrderSerializer, TokenObtainSerializer
from core.models import Product, Order, OrderItem

logger = logging.getLogger(__name__)

User = get_user_model()


class UserViewset(viewsets.ModelViewSet):
    serializer_class = UserSerializer.UserRetrieveSerializer
    queryset = User.objects.all()

    @transaction.atomic()
    def create(self, request, *args, **kwargs):
        logger.info(f"User registration attempt with data: {request.data}")

        serializer = UserSerializer.UserCreateSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            logger.info("User data validated successfully.")
            user = serializer.save()

            serializer = self.get_serializer(user)
            response = Response(data=serializer.data, status=status.HTTP_201_CREATED)
            return response
        else:
            logger.error(f"User registration failed due to invalid data: {serializer.errors}")
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(methods=['get'], detail=False, permission_classes=[permissions.IsAuthenticated])
    def me(self, request, *args, **kwargs):
        user = request.user
        serializer = UserSerializer.UserRetrieveSerializer(user)

        return Response(data=serializer.data)

    @action(methods=["post"], detail=False, permission_classes=[permissions.AllowAny])
    def reset_password(self, request, *args, **kwargs):
        logger.info(f"Password reset request with data: {request.data}")

        serializer = UserSerializer.ResetPasswordRequestSerializer(
            data=request.data)
        if serializer.is_valid(raise_exception=True):
            email = request.data["email"]
            user = User.objects.filter(email__iexact=email).first()

            if user:
                logger.info(f"User found for email: {email}, initiating password reset.")
                token_generator = PasswordResetTokenGenerator()
                token = token_generator.make_token(user)
                logger.debug(f"Generated token: {token}")

                reset_url = f"{settings.PASSWORD_RESET_BASE_URL}/{user.id}:{token}"
                logger.info(f"Password reset URL: {reset_url}")

                subject = "Password Reset Request"
                message = f"Hi {user.first_name},\n\nPlease click the link below to reset your \npassword:{reset_url}\n\nIf you did not request this, please ignore this email."
                email_from = settings.DEFAULT_FROM_EMAIL

                logger.info(f"Sending password reset email to: {email}")
                user.email_user(subject, message, email_from)
                logger.info(f"Password reset email sent successfully to: {email}")

                return Response({'message': 'We have sent you a link to reset your password'}, status=status.HTTP_200_OK)
            else:
                logger.warning(f"User with email {email} not found.")
                return Response({"error": "User with email not found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            logger.error(f"Password reset request failed due to invalid data: {serializer.errors}")
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(methods=["post"], detail=False, permission_classes=[permissions.AllowAny])
    def reset_password_complete(self, request, *args, **kwargs):
        logger.info(f"Password reset complete request with data: {request.data}")

        serializer = UserSerializer.ResetPasswordComplete(data=request.data)
        if serializer.is_valid():
            logger.info("Password reset request completed successfully.")
            serializer.save()
            logger.info(f"Password reset successfully for user: {self.request.user.id}")
            return Response({"message": "Password updated successfully."}, status=status.HTTP_200_OK)
        else:
            logger.error(f"Password reset request failed due to invalid data: {serializer.errors}")
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(methods=["post"], detail=False, permission_classes=[permissions.IsAuthenticated])
    def change_password(self, request, *args, **kwargs):
        serializer = UserSerializer.ChangePasswordSerializer(data=request.data, context={"request": request})

        if serializer.is_valid():
            logger.info(f"Password change request with data: {request.data}")
            serializer.save()
            return Response({"message": "Password change successfully."}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(methods=['post'], detail=False, permission_classes=[permissions.IsAuthenticated])
    def add_to_wishlist(self, request, *args, **kwargs):
        request.data['user'] = request.user.id
        serializer = WishlistSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        serializer.save(user=request.user)

        return Response(dict(message="Wishlist added successfully", data=serializer.data), status=status.HTTP_201_CREATED)

    @action(methods=['post'], detail=False, permission_classes=[permissions.IsAuthenticated])
    def remove_from_wishlist(self, request, *args, **kwargs):
        """Remove a product from the user's wishlist."""
        product_id = request.data['product_id']  # Get product ID from URL
        
        try:
            wishlist_item = Wishlist.objects.get(user=request.user, product_id=product_id)
            wishlist_item.delete()
            return Response({"message": "Product removed from wishlist."}, status=status.HTTP_204_NO_CONTENT)
        except Wishlist.DoesNotExist:
            return Response({"message": "Product not found in wishlist."}, status=status.HTTP_404_NOT_FOUND)
    
    @action(methods=['get'], detail=False, permission_classes=[permissions.IsAuthenticated])
    def get_wishlists(self, request, *args, **kwargs):
        """Return all user's wishlist with pagination."""

        wishlist_items = Wishlist.objects.filter(user=request.user)
        page = self.paginate_queryset(wishlist_items)
        serializer = WishlistSerializer(page, many=True)
        return self.get_paginated_response(serializer.data)        

    @action(methods=['get'], detail=False)
    def get_user_cart(self, request, *args, **kwargs):
        cart = Cart.objects.filter(user=request.user)
        page = self.paginate_queryset(cart)
        serializer = CartSerializer(page, many=True)
        return self.get_paginated_response(serializer.data)    

    @action(methods=['post'], detail=False, permission_classes=[permissions.IsAuthenticated])
    def add_item_to_cart(self, request, *args, **kwargs):
        serializer = CartItemSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        serializer.save(user=request.user)
        return Response(dict(message="Item added to cart successfully", data=serializer.data), status=status.HTTP_201_CREATED) 

    @action(methods=['post'], detail=False, permission_classes=[permissions.IsAuthenticated])
    def remove_item_to_cart(self, request, *args, **kwargs):
        product_id = request.data['product_id']  # Get product ID from URL
        
        try:
            cart_item = CartItem.objects.get(user=request.user, product=product_id)
            cart_item.delete()
            return Response({"message": "Product removed from cart."}, status=status.HTTP_204_NO_CONTENT)
        except CartItem.DoesNotExist:
            return Response({"message": "Product not found in cart."}, status=status.HTTP_404_NOT_FOUND)
    
    @action(methods=['get'], detail=False, permission_classes=[permissions.IsAuthenticated])
    def get_user_orders(self, request, *args, **kwargs):
        """Retrieve all orders placed by the authenticated user."""
        orders = Order.objects.filter(user=request.user)
        page = self.paginate_queryset(orders)
        serializer = OrderSerializer(page, many=True)
        return self.get_paginated_response(serializer.data)

    @transaction.atomic()
    @action(methods=['post'], detail=False, permission_classes=[permissions.IsAuthenticated])
    def create_order(self, request, *args, **kwargs):
        """Create a new order for the authenticated user."""
        serializer = CreateOrderSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        order = serializer.save(user=request.user)
        return Response(
            dict(message="Order created successfully", data=OrderSerializer(order).data),
            status=status.HTTP_201_CREATED,
        )

    @action(methods=['patch'], detail=False, permission_classes=[permissions.IsAuthenticated])
    def update_billing_information(self, request, *args, **kwargs):
        """Update the billing information for the authenticated user."""
        user = request.user
        serializer = UpdateBillingAddressSerializer(user.billing_address, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(
            dict(message="Billing information updated successfully", data=serializer.data),
            status=status.HTTP_200_OK,
        )


# class LoginView(APIView):
#     def post(self, request):
#         serializer = LoginUserSerializer(data=request.data)
#         print(serializer)
#         if serializer.is_valid():
#             user = serializer.validated_data
#             refresh = RefreshToken.for_user(user)
#             access_token = str(refresh.access_token)
            
#             response = Response({
#                 "user": UserSerializer.UserRetrieveSerializer(user).data,
#                 "access_token": access_token,
#                 "refresh_token": str(refresh)
#                 },
#                                 status=status.HTTP_200_OK)
            
#             response.set_cookie(key="access_token", 
#                                 value=access_token,
#                                 httponly=True,
#                                 secure=True,
#                                 samesite="None")
            
#             response.set_cookie(key="refresh_token",
#                                 value=str(refresh),
#                                 httponly=True,
#                                 secure=True,
#                                 samesite="None")
#             return response
#         return Response( serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# class LogoutView(APIView):
    
#     def post(self, request):
#         refresh_token = request.COOKIES.get("refresh_token")
        
#         if refresh_token:
#             try:
#                 refresh = RefreshToken(refresh_token)
#                 refresh.blacklist()
#             except Exception as e:
#                 return Response({"error":"Error invalidating token:" + str(e) }, status=status.HTTP_400_BAD_REQUEST)
        
#         response = Response({"message": "Successfully logged out!"}, status=status.HTTP_200_OK)
#         response.delete_cookie("access_token")
#         response.delete_cookie("refresh_token")
        
#         return response    


# class CookieTokenRefreshView(TokenRefreshView):
#     def post(self, request):
        
#         refresh_token = request.COOKIES.get("refresh_token")
        
#         if not refresh_token:
#             return Response({"error":"Refresh token not provided"}, status= status.HTTP_401_UNAUTHORIZED)
    
#         try:
#             refresh = RefreshToken(refresh_token)
#             access_token = str(refresh.access_token)
            
#             response = Response({
#                 "message": "Access token token refreshed successfully", 
#                 "access_token": access_token,
#                 "refresh_token": str(refresh)
#                                  }, status=status.HTTP_200_OK)
#             response.set_cookie(key="access_token", 
#                                 value=access_token,
#                                 httponly=True,
#                                 secure=True,
#                                 samesite="None")
#             return response
#         except InvalidToken:
#             return Response({"error":"Invalid token"}, status=status.HTTP_401_UNAUTHORIZED)


class TokenObtainPairView(SimpleJWTTokenObtainPairView):
     serializer_class = TokenObtainSerializer
 
     def post(self, request, *args, **kwargs) -> Response:
         return super().post(request, *args, **kwargs)
