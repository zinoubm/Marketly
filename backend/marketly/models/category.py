from django.db import models
from django.utils.text import slugify


class Category(models.Model):
    title = models.CharField(max_length=30)

    @property
    def slug(self):
        return slugify(self.title).replace("-", "_")
