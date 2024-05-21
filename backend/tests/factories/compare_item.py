import pytest
import factory

from marketly.models import CompareItem


@pytest.mark.django_db
class CompareItemFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = CompareItem
