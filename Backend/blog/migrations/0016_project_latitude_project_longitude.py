# Generated by Django 5.1.2 on 2024-12-13 20:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0015_shecan_cohert'),
    ]

    operations = [
        migrations.AddField(
            model_name='project',
            name='latitude',
            field=models.FloatField(default=0.0),
        ),
        migrations.AddField(
            model_name='project',
            name='longitude',
            field=models.FloatField(default=0.0),
        ),
    ]
