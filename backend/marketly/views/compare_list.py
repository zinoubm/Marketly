from rest_framework import generics, permissions


from marketly.models import CompareList
from marketly.serializers import CompareListSerializer


class CompareListListCreateAPIView(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = CompareListSerializer

    def get_queryset(self):
        return CompareList.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
