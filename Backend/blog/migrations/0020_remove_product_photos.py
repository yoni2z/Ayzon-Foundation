# Generated by Django 5.1.2 on 2024-12-15 15:40

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0019_category_product_productphoto_product_photos_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='product',
            name='photos',
        ),
    ]
