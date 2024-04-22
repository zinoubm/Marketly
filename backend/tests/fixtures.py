import pytest
from marketly.models import Product


@pytest.fixture
def api_client():
    from rest_framework.test import APIClient

    return APIClient()


@pytest.fixture
def get_seller_id():
    def get_seller_id(order):
        product = Product.objects.filter(id=order["product"]).first()

        return product.seller.id

    return get_seller_id
