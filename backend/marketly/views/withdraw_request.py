from rest_framework import generics
from marketly.models import WithdrawRequest
from marketly.serializers import WithdrawRequestSerializer


class WithdrawRequestListCreateAPIView(generics.ListCreateAPIView):
    queryset = WithdrawRequest.objects.all()
    serializer_class = WithdrawRequestSerializer

    def perform_create(self, serializer):
        serializer.save(buyer=self.request.user)


class WithdrawRequestDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = WithdrawRequest.objects.all()
    serializer_class = WithdrawRequestSerializer
