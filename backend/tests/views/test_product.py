import pytest
from tests.fixtures import api_client

from tests.factories import UserFactory, ProductFactory, CategoryFactory


@pytest.mark.django_db
def test_product_list_create_api_view(api_client):
    url = "http://localhost:8000/api/products/"

    user = UserFactory()
    api_client.force_authenticate(user=user)

    category = CategoryFactory()

    data = {
        "title": "some product",
        "description": "some product description",
        "inventory": 20,
        "category": category.id,
    }

    # test create
    response = api_client.post(url, data, format="json")
    assert response.status_code == 201

    # test list
    response = api_client.get(url)
    assert response.status_code == 200
    assert len(response.data) > 0


@pytest.mark.django_db
def test_product_retrieve_update_destroy_api_view(api_client):
    base_url = "http://localhost:8000/api/products"

    user = UserFactory()
    api_client.force_authenticate(user=user)
    product = ProductFactory()
    category = CategoryFactory()

    url = f"{base_url}/{product.id}/"

    # test retrieve
    response = api_client.get(url)
    assert response.status_code == 200
    assert response.data["title"] == product.title

    new_title = "new title"
    data = {
        "title": new_title,
        "description": "some product description",
        "inventory": 20,
        "category": category.id,
    }

    # test update
    response = api_client.put(url, data, format="json")
    assert response.status_code == 200
    assert response.data["title"] == new_title

    # test delete
    response = api_client.delete(url)
    assert response.status_code == 204
