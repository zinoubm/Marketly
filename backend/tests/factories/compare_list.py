import pytest
import factory

from marketly.models import CompareList


@pytest.mark.django_db
class CompareListFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = CompareList
