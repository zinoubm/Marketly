import pytest
import factory

from marketly.models import Review
from tests.factories import UserFactory, ProductFactory


@pytest.mark.django_db
class ReviewFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Review
