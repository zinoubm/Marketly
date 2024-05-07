from rest_framework import generics
from marketly.models import Notification
from marketly.serializers import NotificationSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND
from drf_spectacular.utils import extend_schema


class NotificationListCreateAPIView(generics.ListCreateAPIView):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]


class NotificationMarkIsSeenView(APIView):

    permission_classes = [IsAuthenticated]

    @extend_schema(
        request={"id": 0},
        responses={200: {"success": ""}},
        description="Make a PATCH request and Give it the id of the notification in the data object and the view will turn is_seen to True",
    )
    def patch(self, request, *args, **kwargs):
        notification_id = request.data.get("id")
        if not notification_id:
            return Response(
                {"id": "This field is required"}, status=HTTP_400_BAD_REQUEST
            )
        try:
            notification = Notification.objects.get(id=notification_id)
        except Notification.DoesNotExist:
            return Response(
                {"error": "Notification not found"}, status=HTTP_404_NOT_FOUND
            )
        notification = Notification.objects.get(id=notification_id)
        notification.is_seen = True
        notification.save()
        return Response({"success": "Notification marked as seen"}, status=HTTP_200_OK)
