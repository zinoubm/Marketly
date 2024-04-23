import os
import urllib
from urllib.parse import urlparse
from django.core.files import File
from django.core.files.temp import NamedTemporaryFile

from rest_framework import exceptions, serializers
from django.db.models import Q
from django.conf import settings
from django.contrib.auth import get_user_model
from dj_rest_auth.registration.serializers import RegisterSerializer
from dj_rest_auth.serializers import UserDetailsSerializer

from google.oauth2 import id_token
from google.auth.transport import requests


UserModel = get_user_model()


class UserRegisterSerializer(RegisterSerializer):
    username = None
    first_name = serializers.CharField(
        max_length=255,
        min_length=2,
        required=True,
    )
    last_name = serializers.CharField(
        max_length=255,
        min_length=2,
        required=True,
    )

    def get_cleaned_data(self):
        super().get_cleaned_data()
        return {
            "first_name": self.validated_data.get("first_name", ""),
            "last_name": self.validated_data.get("last_name", ""),
            "password1": self.validated_data.get("password1", ""),
            "email": self.validated_data.get("email", ""),
        }

    def custom_signup(self, request, user):
        user.username = user.email
        user.first_name = self.validated_data.get("first_name", "")
        user.last_name = self.validated_data.get("last_name", "")
        user.save()


class UserLoginSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField(write_only=True)

    @staticmethod
    def validate_auth_user_status(user):
        if not user.is_active:
            raise exceptions.ValidationError("User account is disabled.")

    def validate(self, attrs):
        email = attrs.get("email")
        password = attrs.get("password")

        user_queryset = UserModel.objects.filter(
            Q(email__iexact=email) | Q(username__iexact=email)
        ).distinct()

        if user_queryset.exists() and user_queryset.count() == 1:
            user_set = user_queryset.first()
            if user_set.check_password(password):
                user = user_set

            else:
                raise serializers.ValidationError("Incorrect Password!")

        else:
            raise serializers.ValidationError("Not Valid User!")

        self.validate_auth_user_status(user)

        attrs["user"] = user
        return attrs


class GoogleLoginSerializer(serializers.Serializer):
    token = serializers.CharField(required=True, max_length=1500)

    def get_or_create_auth_user(self, email, full_name, user_picture_url):
        if email:
            try:
                user = UserModel.objects.get(email__iexact=email)

            except UserModel.DoesNotExist:
                user = UserModel.objects.create_user(
                    username=email, email=email, google_profile_image=user_picture_url
                )
                if full_name:
                    # assuming last names are single words at the end,
                    # the remaining words will be the first name
                    full_name_split = full_name.split()
                    user.first_name = " ".join(full_name_split[:-1])
                    user.last_name = full_name_split[-1]

                user.save()

            return user

        return None

    @staticmethod
    def validate_auth_user_status(user):
        if not user.is_active:
            raise exceptions.ValidationError("User account is disabled.")

    def validate(self, attrs):
        try:
            CLIENT_ID = settings.GOOGLE_CLIENT_ID
            token = attrs.get("token")

            id_info = id_token.verify_oauth2_token(token, requests.Request(), CLIENT_ID)
            user_email = id_info["email"]
            user_full_name = id_info["name"]
            user_picture_url = id_info["picture"]

        except ValueError:
            raise exceptions.ValidationError("Invalid token")

        user = self.get_or_create_auth_user(
            user_email, user_full_name, user_picture_url
        )

        if not user:
            raise exceptions.ValidationError(
                "Unable to log in with provided credentials."
            )

        self.validate_auth_user_status(user)

        attrs["user"] = user
        return attrs


class CustomUserDetailsSerializer(UserDetailsSerializer):
    profile_image = serializers.ImageField(write_only=True)

    class Meta(UserDetailsSerializer.Meta):
        extra_fields = UserDetailsSerializer.Meta.extra_fields + [
            "profile_image",
            "image",
        ]

        fields = ("pk", *extra_fields)
        read_only_fields = ["image"]

    # def to_representation(self, instance):
    #     representation = super().to_representation(instance)
    #     print("representation", representation)

    #     # if representation["profile_image"] is None:
    #     #     representation["profile_image"] = representation["google_profile_image"]

    #     return representation

    # def update(self, instance, validated_data):
    #     profile_image = validated_data.pop("profile_image", None)
    #     user = super().update(instance, validated_data)
    #     if profile_image:
    #         user.profile_image = profile_image
    #         user.save()
    #     return user
