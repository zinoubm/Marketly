from django.db import models
from marketly.models import Product, CompareList


class CompareItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    compare_list = models.ForeignKey(CompareList, on_delete=models.CASCADE)
