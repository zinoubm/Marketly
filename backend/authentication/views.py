from rest_framework import generics, permissions
from rest_framework.parsers import MultiPartParser, FormParser
from dj_rest_auth.registration.views import RegisterView
from dj_rest_auth.views import LoginView, UserDetailsView
from .serializers import (
    UserRegisterSerializer,
    UserLoginSerializer,
    GoogleLoginSerializer,
    CustomUserDetailsSerializer,
)


class UserRegisterViwe(RegisterView):
    serializer_class = UserRegisterSerializer


class UserLoginView(LoginView):
    serializer_class = UserLoginSerializer


class GoogleLoginView(LoginView):
    serializer_class = GoogleLoginSerializer


class CustomUserDetailsView(UserDetailsView):
    serializer_class = CustomUserDetailsSerializer
    parser_classes = (MultiPartParser, FormParser)
