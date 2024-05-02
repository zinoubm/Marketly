from rest_framework import serializers
from marketly.models import WithdrawRequest
from authentication.models import User


class WithdrawRequestSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = WithdrawRequest
        fields = "__all__"
