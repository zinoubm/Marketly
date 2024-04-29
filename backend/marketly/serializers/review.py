from rest_framework import serializers
from marketly.models import Review, Product
from authentication.models import User


class ReviewSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    product = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all())

    class Meta:
        model = Review
        fields = "__all__"
