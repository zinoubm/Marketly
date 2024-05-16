from django.core.validators import URLValidator
from django.core.exceptions import ValidationError


def is_valid_url(url):
    validator = URLValidator()
    try:
        validator(url)
        return True
    except ValidationError:
        return False
