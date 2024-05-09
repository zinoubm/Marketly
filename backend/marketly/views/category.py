# views.py
from rest_framework import generics, permissions

from marketly.models import Category
from marketly.serializers.category import CategorySerializer


class CategoryListAPIView(generics.ListAPIView):
    permission_classes = []

    queryset = Category.objects.all()
    serializer_class = CategorySerializer
