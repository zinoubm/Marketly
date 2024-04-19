from dj_rest_auth.registration.views import RegisterView
from dj_rest_auth.views import LoginView
from .serializers import (
    UserRegisterSerializer,
    UserLoginSerializer,
    GoogleLoginSerializer,
)


class UserRegisterViwe(RegisterView):
    serializer_class = UserRegisterSerializer


class UserLoginView(LoginView):
    serializer_class = UserLoginSerializer


class GoogleLoginView(LoginView):
    serializer_class = GoogleLoginSerializer
