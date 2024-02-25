from django.conf import settings
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializers import GoogleLoginSerializer


from google.oauth2 import id_token
from google.auth.transport import requests


class GoogleLoginView(APIView):
    authentication_classes = []
    permission_classes = []

    def post(self, request, *args, **kwargs):
        serializer = GoogleLoginSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        token = serializer.validated_data["token"]

        if not token:
            return Response(
                {"error": "Token is required"}, status=status.HTTP_400_BAD_REQUEST
            )

        try:
            CLIENT_ID = settings.GOOGLE_CLIENT_ID
            id_info = id_token.verify_oauth2_token(token, requests.Request(), CLIENT_ID)
            user_email = id_info["email"]
            user_full_name = id_info.get("name")

        except ValueError:
            return Response(
                {"error": "Invalid token"}, status=status.HTTP_400_BAD_REQUEST
            )

        try:
            user = User.objects.get(email=user_email)
        except User.DoesNotExist:
            user = User.objects.create_user(username=user_email, email=user_email)
            if user_full_name:
                user.full_name = user_full_name
            user.save()

        user = authenticate(request, username=user_email)
        if user is not None:
            login(request, user)
            return Response({"message": "Authentication successful"})

        else:
            return Response(
                {"error": "Authentication failed"},
                status=status.HTTP_401_UNAUTHORIZED,
            )
