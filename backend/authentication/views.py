from django.conf import settings
from django.http import HttpResponse

from dj_rest_auth.views import LoginView
from rest_framework.response import Response
from rest_framework import status

from google.oauth2 import id_token
from google.auth.transport import requests


class GoogleLoginView(LoginView):
    def post(self, request, *args, **kwargs):
        try:
            CLIENT_ID = settings.GOOGLE_CLIENT_ID
            token = request.data.get("token")

            id_info = id_token.verify_oauth2_token(token, requests.Request(), CLIENT_ID)
            user_id = id_info["sub"]
            user_email = id_info["email"]
            user_full_name = id_info["name"]

        except ValueError:
            return HttpResponse("Invalid token", status=400)

        response = {
            "user_id": user_id,
            "user_email": user_email,
            "user_full_name": user_full_name,
        }

        # response = super().post(request, *args, **kwargs)
        return response
