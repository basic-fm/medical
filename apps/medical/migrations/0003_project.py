# Generated by Django 4.0.4 on 2022-04-25 12:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('medical', '0002_rename_medical_testmodel'),
    ]

    operations = [
        migrations.CreateModel(
            name='Project',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
            ],
        ),
    ]
