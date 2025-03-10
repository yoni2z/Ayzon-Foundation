# Generated by Django 5.1.2 on 2024-11-17 14:09

import phonenumber_field.modelfields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0004_blog_date_alter_blog_image'),
    ]

    operations = [
        migrations.CreateModel(
            name='Certificate',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('organization', models.CharField(max_length=255)),
                ('date_awarded', models.DateField()),
            ],
        ),
        migrations.CreateModel(
            name='Education',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('degree', models.CharField(max_length=255)),
                ('institution', models.CharField(max_length=255)),
                ('start_date', models.DateField()),
                ('graduation_date', models.DateField(blank=True, null=True)),
                ('location', models.CharField(blank=True, max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='HonorAndAward',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('organization', models.CharField(max_length=255)),
                ('date_awarded', models.DateField()),
            ],
        ),
        migrations.CreateModel(
            name='Interest',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='Language',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('proficiency', models.CharField(choices=[('Native', 'Native'), ('Fluent', 'Fluent'), ('Intermediate', 'Intermediate'), ('Beginner', 'Beginner')], max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Skill',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='WorkExperience',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('job_title', models.CharField(max_length=255)),
                ('company', models.CharField(max_length=255)),
                ('start_date', models.DateField()),
                ('end_date', models.DateField(blank=True, null=True)),
                ('location', models.CharField(blank=True, max_length=255)),
                ('description', models.TextField(blank=True)),
            ],
        ),
        migrations.CreateModel(
            name='SheCan',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('full_name', models.CharField(max_length=100)),
                ('shecan_id', models.CharField(max_length=50, unique=True)),
                ('profession', models.CharField(default='Undefined', max_length=300)),
                ('self_description', models.TextField(blank=True, null=True)),
                ('phone', phonenumber_field.modelfields.PhoneNumberField(blank=True, help_text='+251912345678', max_length=128, null=True, region=None)),
                ('address', models.CharField(blank=True, max_length=255, null=True)),
                ('picture', models.ImageField(upload_to='shecan_images/')),
                ('email', models.EmailField(blank=True, max_length=254, null=True)),
                ('telegram', models.CharField(blank=True, max_length=150, null=True)),
                ('instagram', models.CharField(blank=True, max_length=150, null=True)),
                ('linkedin', models.CharField(blank=True, max_length=150, null=True)),
                ('facebook', models.CharField(blank=True, max_length=150, null=True)),
                ('skype', models.CharField(blank=True, max_length=255, null=True)),
                ('certificates', models.ManyToManyField(blank=True, to='blog.certificate')),
                ('education', models.ManyToManyField(blank=True, to='blog.education')),
                ('honors_and_awards', models.ManyToManyField(blank=True, to='blog.honorandaward')),
                ('interests', models.ManyToManyField(blank=True, to='blog.interest')),
                ('languages', models.ManyToManyField(blank=True, to='blog.language')),
                ('skills', models.ManyToManyField(blank=True, to='blog.skill')),
                ('work_experience', models.ManyToManyField(blank=True, to='blog.workexperience')),
            ],
        ),
    ]
