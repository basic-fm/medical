# Generated by Django 4.0.4 on 2022-04-26 07:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('medical', '0008_rename_updated_at_delivery_delivered_at'),
    ]

    operations = [
        migrations.AlterField(
            model_name='delivery',
            name='delivered_at',
            field=models.DateTimeField(),
        ),
    ]