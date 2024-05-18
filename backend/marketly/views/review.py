from rest_framework import generics
from marketly.models import Review
from marketly.serializers import ReviewSerializer
from rest_framework.permissions import IsAuthenticated
from drf_spectacular.utils import extend_schema


class ReviewListCreateAPIView(generics.ListCreateAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @extend_schema(
        description="API endpoint create reviews or get reviews for a specific product by passing the product_id as querystring ex: ?product_id=3"
    )
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def get_queryset(self):
        product_id = self.request.query_params.get("product_id")
        if product_id:
            return Review.objects.filter(product_id=int(product_id))
        else:
            return Review.objects.all()

    def perform_create(self, serializer):
        self.order_instance = serializer.save(user=self.request.user)
