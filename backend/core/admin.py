from django.contrib import admin
from django.utils.text import slugify
from .models import Product, ProductImage, ProductReview, ProductRating, Order, OrderItem

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'price', 'sale_price', 'sku', 'slug')
    search_fields = ('name', 'category', 'sku')
    prepopulated_fields = {"slug": ("name",)}

@admin.register(ProductImage)
class ProductImageAdmin(admin.ModelAdmin):
    list_display = ('product', 'is_main', 'url')

@admin.register(ProductReview)
class ProductReviewAdmin(admin.ModelAdmin):
    list_display = ('id',)  # Customize based on actual fields

@admin.register(ProductRating)
class ProductRatingAdmin(admin.ModelAdmin):
    list_display = ('id',)  # Customize based on actual fields

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('user', 'status', 'total_price', 'created_at')
    list_filter = ('status', 'created_at')
    search_fields = ('user__email', 'status')

@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ('order', 'product', 'quantity', 'price')
