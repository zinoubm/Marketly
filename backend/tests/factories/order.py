import pytest
import factory

from marketly.models import Order, OrderStatus
from tests.factories import UserFactory, ProductFactory


@pytest.mark.django_db
class OrderFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Order

    date = factory.Faker("date")
    status = OrderStatus.SHIPPING
    buyer = factory.SubFactory(UserFactory)
    product = factory.SubFactory(ProductFactory)
    quantity = factory.Faker("random_int", min=1, max=10)
