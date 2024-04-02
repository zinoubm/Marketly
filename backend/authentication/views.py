from django.conf import settings
from django.http import HttpResponse

from rest_framework.generics import GenericAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from dj_rest_auth.views import LoginView
from .serializers import GoogleLoginSerializer

from google.oauth2 import id_token
from google.auth.transport import requests


class GoogleLoginView(LoginView):
    serializer_class = GoogleLoginSerializer
