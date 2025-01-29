# Generated by Django 5.1.3 on 2024-11-17 15:00

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0005_certificate_education_honorandaward_interest_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='shecan',
            name='certificates',
        ),
        migrations.RemoveField(
            model_name='shecan',
            name='education',
        ),
        migrations.RemoveField(
            model_name='shecan',
            name='honors_and_awards',
        ),
        migrations.RemoveField(
            model_name='shecan',
            name='interests',
        ),
        migrations.RemoveField(
            model_name='shecan',
            name='languages',
        ),
        migrations.RemoveField(
            model_name='shecan',
            name='skills',
        ),
        migrations.RemoveField(
            model_name='shecan',
            name='work_experience',
        ),
        migrations.DeleteModel(
            name='Certificate',
        ),
        migrations.DeleteModel(
            name='Education',
        ),
        migrations.DeleteModel(
            name='HonorAndAward',
        ),
        migrations.DeleteModel(
            name='Interest',
        ),
        migrations.DeleteModel(
            name='Language',
        ),
        migrations.DeleteModel(
            name='Skill',
        ),
        migrations.DeleteModel(
            name='SheCan',
        ),
        migrations.DeleteModel(
            name='WorkExperience',
        ),
    ]
