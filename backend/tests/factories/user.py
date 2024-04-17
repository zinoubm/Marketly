from factory.django import DjangoModelFactory
from authentication.models import User


class UserFactory(DjangoModelFactory):
    class Meta:
        model = User
        django_get_or_create = ("username",)

    username = "john"
