import pytest
from tests.fixtures import api_client, get_seller_id
from tests.factories import UserFactory, CompareListFactory


@pytest.mark.django_db
class TestCompareListListCreateAPI:
    def setup_method(self, method):
        self.url = "http://localhost:8000/api/compare-lists/"
        self.user = UserFactory()
        self.user_compare_list = CompareListFactory(user=self.user)

        self.other_user = UserFactory()
        self.other_user_compare_list = CompareListFactory(user=self.other_user)

    def test_create_compare_list(self, api_client):
        data = {
            "title": "Test Title",
        }

        api_client.force_authenticate(user=self.user)
        response = api_client.post(self.url, data, format="json")

        assert response.status_code == 201

    def test_get_compare_lists(self, api_client):
        api_client.force_authenticate(user=self.user)
        response = api_client.get(self.url, format="json")
        compare_lists = response.data

        assert response.status_code == 200
        assert all(
            compare_list["user"] == self.user.id for compare_list in compare_lists
        )
