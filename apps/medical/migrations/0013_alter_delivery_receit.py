# Generated by Django 4.0.4 on 2022-04-28 07:50

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('medical', '0012_remove_receit_delivery_delivery_receit'),
    ]

    operations = [
        migrations.AlterField(
            model_name='delivery',
            name='receit',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='medical.receit'),
        ),
    ]
