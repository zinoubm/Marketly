from dj_rest_auth.registration.views import RegisterView
from dj_rest_auth.views import LoginView, LogoutView, UserDetailsView
from allauth.socialaccount.views import signup
from authentication.views import UserRegisterViwe, UserLoginView, GoogleLoginView
from django.urls import path

urlpatterns = [
    path("register/", UserRegisterViwe.as_view(), name="rest_register"),
    path("login/", UserLoginView.as_view(), name="rest_login"),
    path("logout/", LogoutView.as_view(), name="rest_logout"),
    path("user/", UserDetailsView.as_view(), name="rest_user_details"),
    path("google/login/", GoogleLoginView.as_view(), name="google_login"),
]
