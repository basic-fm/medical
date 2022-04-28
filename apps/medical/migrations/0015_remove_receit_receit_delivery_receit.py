# Generated by Django 4.0.4 on 2022-04-28 09:31

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('medical', '0014_remove_delivery_receit_receit_receit'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='receit',
            name='receit',
        ),
        migrations.AddField(
            model_name='delivery',
            name='receit',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='medical.receit'),
        ),
    ]