import pytest
from tests.fixtures import api_client
from tests.factories import UserFactory, CategoryFactory

from django.utils.text import slugify


@pytest.mark.django_db
def test_category_list_view(api_client):
    url = "http://localhost:8000/api/category/"

    user = UserFactory()
    api_client.force_authenticate(user=user)
    category = CategoryFactory()

    response = api_client.get(url)
    assert response.status_code == 200
    assert response.data[0]["slug"] == slugify(category.title).replace("-", "_")
