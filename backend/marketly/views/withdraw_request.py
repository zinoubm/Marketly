from rest_framework import generics
from marketly.models import WithdrawRequest
from marketly.serializers import WithdrawRequestSerializer
from rest_framework.permissions import IsAuthenticated


class WithdrawRequestListCreateAPIView(generics.ListCreateAPIView):
    queryset = WithdrawRequest.objects.all()
    serializer_class = WithdrawRequestSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(buyer=self.request.user)
