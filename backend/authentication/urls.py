from dj_rest_auth.views import LogoutView

from authentication.views import (
    UserRegisterViwe,
    UserLoginView,
    GoogleLoginView,
    CustomUserDetailsView,
)
from django.urls import path

urlpatterns = [
    path("register/", UserRegisterViwe.as_view(), name="rest_register"),
    path("login/", UserLoginView.as_view(), name="rest_login"),
    path("logout/", LogoutView.as_view(), name="rest_logout"),
    path("user/", CustomUserDetailsView.as_view(), name="rest_user_details"),
    path("google/login/", GoogleLoginView.as_view(), name="google_login"),
]
