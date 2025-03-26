from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.mail import send_mail
from django.contrib.auth.models import BaseUserManager
from utils import BaseModelMixin


class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        """Create and return a regular user with an email and password."""
        if not email:
            raise ValueError("The Email field must be set")
        
        email = self.normalize_email(email)
        extra_fields.setdefault('is_active', True)
        user = self.model(email=email, **extra_fields)
        if password:
            user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        """Create and return a superuser with an email and password."""
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        
        if extra_fields.get('is_staff') is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get('is_superuser') is not True:
            raise ValueError("Superuser must have is_superuser=True.")
        
        return self.create_user(email, password, **extra_fields)


class User(AbstractUser, BaseModelMixin):

    email = models.EmailField(unique=True, db_index=True)
    first_name = models.CharField(max_length=300, blank=False, null=False)
    last_name = models.CharField(max_length=300, blank=False, null=False)
    username = models.CharField(max_length=50, unique=True, null=True, blank=True)

    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    objects = CustomUserManager()

    class Meta:
        ordering = ["-created_at"]

    @property
    def fullname(self):
        return f"{self.first_name} {self.last_name}"

    def email_user(self, subject, message, from_email=None, **kwargs):
        """Send an email to this user."""
        send_mail(
            subject,
            message,
            from_email,
            [
                self.email
            ],
            fail_silently=True,
            **kwargs,
        )


class Wishlist(BaseModelMixin):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="wishlist")
    product = models.ForeignKey("core.product", on_delete=models.CASCADE, related_name="wishlist_items")

    class Meta:
        unique_together = ("user", "product")
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.user.email} - {self.product.name}"


class Cart(BaseModelMixin):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="cart")

    def total_price(self):
        return sum(item.total_price() for item in self.cart_items.all())

    def __str__(self):
        return f"Cart of {self.user.email}"


class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name="cart_items")
    product = models.ForeignKey("core.Product", on_delete=models.CASCADE, related_name="cart_product")
    quantity = models.PositiveIntegerField(default=1)
    
    class Meta:
        unique_together = ("cart", "product")

    def total_price(self):
        return self.product.price * self.quantity

    def __str__(self):
        return f"{self.quantity} x {self.product.name} in {self.cart.user.email}'s cart"


class BillingAddress(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="billing_addresses")
    full_name = models.CharField(max_length=255)
    address = models.TextField()
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    country = models.CharField(max_length=100)
    postal_code = models.CharField(max_length=20)
    phone = models.CharField(max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.full_name}, {self.address}, {self.city}, {self.country}"

# class Payment(models.Model):
#     PAYMENT_METHODS = [
#         ("stripe", "Stripe"),
#         ("paypal", "PayPal"),
#         ("credit_card", "Credit Card"),
#     ]
    
#     STATUS_CHOICES = [
#         ("pending", "Pending"),
#         ("completed", "Completed"),
#         ("failed", "Failed"),
#     ]
    
#     user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="payments")
#     cart = models.OneToOneField(Cart, on_delete=models.CASCADE, related_name="payment")
#     method = models.CharField(max_length=20, choices=PAYMENT_METHODS, default="stripe")
#     transaction_id = models.CharField(max_length=100, unique=True, blank=True, null=True)
#     status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="pending")
#     created_at = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return f"Payment {self.transaction_id} - {self.status}"

#     def process_payment(self, stripe_token):
#         """Handles Stripe payment processing"""
#         try:
#             charge = stripe.Charge.create(
#                 amount=int(self.cart.total_price() * 100),  # Convert to cents
#                 currency="usd",
#                 source=stripe_token,  # Token from frontend
#                 description=f"Cart {self.cart.id} Payment",
#                 api_key=settings.STRIPE_SECRET_KEY,
#             )
#             self.transaction_id = charge.id
#             self.status = "completed"
#             self.save()
#             return True
#         except stripe.error.StripeError:
#             self.status = "failed"
#             self.save()
#             return False

