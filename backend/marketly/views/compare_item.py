from rest_framework import generics, permissions


from marketly.models import CompareItem
from marketly.serializers import CompareItemSerializer
from marketly.permissions import IsOwnerOfCompareList


class CompareItemCreateAPIView(generics.CreateAPIView):
    permission_classes = [permissions.IsAuthenticated, IsOwnerOfCompareList]
    serializer_class = CompareItemSerializer
    # def get_queryset(self):
    #     return CompareList.objects.filter(user=self.request.user)
