# Generated by Django 5.1.3 on 2024-11-17 17:29

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0007_event_invitedguest_sponsor_eventimage_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Program',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('description', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Project',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('description', models.TextField()),
                ('image', models.ImageField(upload_to='project_images/')),
                ('video', models.FileField(upload_to='project_videos/')),
                ('total_budget', models.DecimalField(decimal_places=2, max_digits=10)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='ProjectItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('photo', models.ImageField(blank=True, null=True, upload_to='project_item_photos')),
                ('quantity_needed', models.PositiveIntegerField(blank=True, null=True)),
                ('funds_needed', models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True)),
                ('project', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='items', to='blog.project')),
            ],
        ),
        migrations.CreateModel(
            name='Donor',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=255, null=True)),
                ('is_anonymous', models.BooleanField(default=False)),
                ('donation_type', models.CharField(choices=[('cash', 'Cash'), ('inkind', 'In-Kind')], max_length=10)),
                ('amount_donated', models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True)),
                ('quantity_donated', models.PositiveIntegerField(blank=True, null=True)),
                ('donation_date', models.DateTimeField(auto_now_add=True)),
                ('project_item', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='donors', to='blog.projectitem')),
            ],
        ),
        migrations.CreateModel(
            name='ProjectName',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('program', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='project_names', to='blog.program')),
            ],
        ),
        migrations.AddField(
            model_name='project',
            name='program',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='projects', to='blog.projectname'),
        ),
    ]
