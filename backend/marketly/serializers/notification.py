from rest_framework import serializers
from marketly.models import Notification
from authentication.models import User


class NotificationSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())

    class Meta:
        model = Notification
        fields = "__all__"
