from rest_framework import generics, permissions
from rest_framework.parsers import MultiPartParser, FormParser

from marketly.models import Product
from marketly.serializers import ProductSerializer


class ProductListCreateAPIView(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = (MultiPartParser, FormParser)

    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def perform_create(self, serializer):
        serializer.save(seller=self.request.user)


class ProductRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = (MultiPartParser, FormParser)

    queryset = Product.objects.all()
    serializer_class = ProductSerializer
