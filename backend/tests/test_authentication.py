from django.urls import reverse
from tests.fixtures import api_client


def test_google_login(api_client):
    url = "http://localhost:8000/api/auth/google/login/"
    data = {"token": "wow"}
    response = api_client.post(url, data=data)
    print(response)
    assert response.status_code == 401
