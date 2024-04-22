# Generated by Django 5.0.3 on 2024-04-18 05:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('marketly', '0003_order'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='products',
            field=models.ManyToManyField(related_name='orders', to='marketly.product'),
        ),
    ]
