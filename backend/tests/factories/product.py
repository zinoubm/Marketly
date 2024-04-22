import pytest

import factory
from marketly.models import Product
from .user import UserFactory
from .category import CategoryFactory


@pytest.mark.django_db
class ProductFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Product
        django_get_or_create = ("title", "category", "seller")

    title = "Gaming mouse"
    category = factory.SubFactory(CategoryFactory)
    seller = factory.SubFactory(UserFactory)
