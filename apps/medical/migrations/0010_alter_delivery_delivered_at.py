# Generated by Django 4.0.4 on 2022-04-26 11:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('medical', '0009_alter_delivery_delivered_at'),
    ]

    operations = [
        migrations.AlterField(
            model_name='delivery',
            name='delivered_at',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]
