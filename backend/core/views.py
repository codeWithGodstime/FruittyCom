from rest_framework import viewsets

from .serializers import ProductSerializer
from .models import Product, ProductImage


class ProductViewset(viewsets.ReadOnlyModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def get_serializer_context(self):
        return {"request": self.request}