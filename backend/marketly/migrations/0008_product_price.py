# Generated by Django 5.0.3 on 2024-04-19 15:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('marketly', '0007_cart'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='price',
            field=models.PositiveIntegerField(default=5),
        ),
    ]
