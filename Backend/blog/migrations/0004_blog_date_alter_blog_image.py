# Generated by Django 5.0.6 on 2024-11-17 09:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0003_remove_blog_date'),
    ]

    operations = [
        migrations.AddField(
            model_name='blog',
            name='date',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='blog',
            name='image',
            field=models.ImageField(upload_to='blog_images/'),
        ),
    ]
