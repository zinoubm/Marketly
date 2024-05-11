from rest_framework import generics, permissions
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import filters
from django_filters import rest_framework as drf_django_filters


from marketly.models import Product
from marketly.serializers import ProductSerializer
from marketly.filters import ProductFilter


# for sellers
class ProductListCreateAPIView(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = (MultiPartParser, FormParser)

    serializer_class = ProductSerializer

    def get_queryset(self):
        return Product.objects.filter(seller=self.request.user)

    def perform_create(self, serializer):
        serializer.save(seller=self.request.user)


class ProductRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = (MultiPartParser, FormParser)

    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class ProductSearchAPIView(generics.ListAPIView):
    serializer_class = ProductSerializer
    permission_classes = []
    filter_backends = [drf_django_filters.DjangoFilterBackend, filters.SearchFilter]
    search_fields = ["title", "description"]
    filterset_class = ProductFilter

    queryset = Product.objects.filter(is_approved=True)
