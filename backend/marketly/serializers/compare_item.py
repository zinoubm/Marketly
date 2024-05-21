from rest_framework import serializers
from marketly.models import CompareItem, Product
from marketly.serializers import ProductSerializer


class CompareItemSerializer(serializers.ModelSerializer):
    product_details = ProductSerializer(source="product", read_only=True)

    class Meta:
        model = CompareItem
        fields = ["product", "compare_list", "product_details"]
