from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from authentication.models import Wishlist, Cart, CartItem
from core.models import Product, ProductImage
from faker import Faker
from django.utils.text import slugify
import random
from decimal import Decimal

User = get_user_model()

class Command(BaseCommand):
    help = "Generate fake data for users, products, and related models"

    def handle(self, *args, **kwargs):
        fake = Faker()
        self.stdout.write("Creating users...")

        users = []
        for _ in range(5):
            email = fake.unique.email()
            first_name = fake.first_name()
            last_name = fake.last_name()
            username = fake.user_name()

            user = User.objects.create_user(
                email=email,
                first_name=first_name,
                last_name=last_name,
                username=username,
                password="timetokill01"
            )
            users.append(user)

        self.stdout.write("Creating products...")
        products = []
        for _ in range(10):
            name = fake.word()
            product = Product.objects.create(
                name=name,
                slug=slugify(name),
                category=fake.word(),
                description=fake.text(),
                sku=random.randint(1000, 9999),
                sale_price=Decimal(random.uniform(5, 100)).quantize(Decimal('0.01')),
                price=Decimal(random.uniform(50, 200)).quantize(Decimal('0.01')),
            )
            products.append(product)

        self.stdout.write("Creating product images...")
        for product in products:
            ProductImage.objects.create(
                product=product,
                is_main=True,
                url=fake.image_url()
            )

        self.stdout.write("Creating wishlists...")
        for user in users:
            Wishlist.objects.create(
                user=user,
                product=random.choice(products)
            )

        self.stdout.write("Creating carts and cart items...")
        for user in users:
            cart = Cart.objects.create(user=user)
            for _ in range(2):
                product = random.choice(products)
                CartItem.objects.create(
                    cart=cart,
                    product=product,
                    quantity=random.randint(1, 5)
                )

        self.stdout.write(self.style.SUCCESS("Fake data successfully generated!"))
