from rest_framework import serializers
from .models import Product, ProductImage


class ProductImageSerializer(serializers.ModelSerializer):
    url = serializers.ImageField(use_url=True)  
    class Meta:
        model = ProductImage
        fields = (
            "url",
            "is_main"
        )

class ProductSerializer(serializers.ModelSerializer):
    discount_percentage = serializers.CharField(source="discount_percent")
    images = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = (
            "id",
            "name",
            "sku",
            "slug",
            "sale_price",
            "price",
            "category",
            "discount_percentage",
            "images"
        )

    def get_images(self, obj):
        request = self.context.get("request")  # Get request from serializer context
        images = obj.productimage_set.all()
        serializer = ProductImageSerializer(images, many=True, context={"request": request})
        return serializer.data
