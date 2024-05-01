from rest_framework import serializers
from marketly.models import Product


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"
        read_only_fields = ["seller", "is_approved"]

