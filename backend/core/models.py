from django.db import models
from django.utils.text import slugify
from utils import BaseModelMixin


class Product(BaseModelMixin):
    slug = models.SlugField(null=True)
    category = models.CharField(max_length=20, null=True)
    description = models.TextField(null=True)
    sku = models.PositiveIntegerField(default=1)
    name = models.CharField(max_length=300, null=True)
    sale_price = models.DecimalField(max_digits=16, decimal_places=2, null=True) # the price sold if discount is available
    price = models.DecimalField(max_digits=16, decimal_places=2, null=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        return super().save(*args, **kwargs)

    @property
    def discount_percent(self):
        pass


class ProductImage(BaseModelMixin):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    is_main = models.BooleanField(default=False)
    url = models.ImageField(null=True)


class ProductReview(BaseModelMixin):
    pass


class ProductRating(BaseModelMixin):
    pass


class Order(BaseModelMixin):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('processing', 'Processing'),
        ('shipped', 'Shipped'),
        ('delivered', 'Delivered'),
        ('cancelled', 'Cancelled'),
    ]

    user = models.ForeignKey("authentication.User", on_delete=models.CASCADE, related_name="orders")
    billing_address = models.ForeignKey("authentication.BillingAddress", on_delete=models.SET_NULL, null=True, blank=True)
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Order {self.id} - {self.status}"

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="items")
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.quantity} x {self.product.name} in Order {self.order.id}"