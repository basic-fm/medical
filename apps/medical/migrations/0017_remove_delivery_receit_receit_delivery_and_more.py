# Generated by Django 4.0.4 on 2022-05-01 15:50

import apps.medical.models
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('medical', '0016_delete_testmodel'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='delivery',
            name='receit',
        ),
        migrations.AddField(
            model_name='receit',
            name='delivery',
            field=models.OneToOneField(default=None, on_delete=django.db.models.deletion.CASCADE, to='medical.delivery'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='receit',
            name='image',
            field=models.ImageField(upload_to=apps.medical.models.get_upload_path),
        ),
    ]
