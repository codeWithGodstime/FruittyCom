from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Wishlist, Cart, CartItem


@admin.register(User)
class CustomUserAdmin(UserAdmin):
    """Admin panel configuration for User model."""
    model = User
    list_display = ("email", "first_name", "last_name", "is_active", "is_staff", "is_superuser")
    list_filter = ("is_active", "is_staff", "is_superuser")
    search_fields = ("email", "first_name", "last_name")
    ordering = ("-created_at",)
    fieldsets = (
        ("Personal Info", {"fields": ("email", "first_name", "last_name", "username")}),
        ("Permissions", {"fields": ("is_active", "is_staff", "is_superuser")}),
        ("Important Dates", {"fields": ("last_login", "created_at", "updated_at")}),
    )
    add_fieldsets = (
        ("Create User", {
            "classes": ("wide",),
            "fields": ("email", "password1", "password2", "first_name", "last_name", "username", "is_active", "is_staff", "is_superuser"),
        }),
    )


@admin.register(Wishlist)
class WishlistAdmin(admin.ModelAdmin):
    """Admin panel configuration for Wishlist model."""
    list_display = ("user", "product", "created_at")
    list_filter = ("user",)
    search_fields = ("user__email", "product__name")
    ordering = ("-created_at",)


class CartItemInline(admin.TabularInline):
    """Allows CartItems to be edited inline within a Cart."""
    model = CartItem
    extra = 1


@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    """Admin panel configuration for Cart model."""
    list_display = ("user", "total_price", "created_at")
    list_filter = ("user",)
    search_fields = ("user__email",)
    ordering = ("-created_at",)
    inlines = [CartItemInline]


@admin.register(CartItem)
class CartItemAdmin(admin.ModelAdmin):
    """Admin panel configuration for CartItem model."""
    list_display = ("cart", "product", "quantity", "total_price")
    list_filter = ("cart",)
    search_fields = ("cart__user__email", "product__name")
    ordering = ("-cart__created_at",)
