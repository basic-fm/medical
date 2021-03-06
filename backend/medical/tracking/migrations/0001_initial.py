# Generated by Django 4.0.4 on 2022-07-04 12:28

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import medical.tracking.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Car',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Delivery',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('delivered_at', models.DateTimeField(blank=True, null=True)),
                ('car', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tracking.car')),
                ('driver', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Parcel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('barcode_data', models.CharField(max_length=100)),
                ('barcode_type', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Receit',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('image', models.ImageField(upload_to=medical.tracking.models.get_upload_path)),
                ('delivery', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='receit', to='tracking.delivery')),
            ],
        ),
        migrations.CreateModel(
            name='Project',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('members', models.ManyToManyField(related_name='projects', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Place',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('project', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tracking.project')),
            ],
        ),
        migrations.AddField(
            model_name='delivery',
            name='from_place',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='from_place', to='tracking.place'),
        ),
        migrations.AddField(
            model_name='delivery',
            name='parcels',
            field=models.ManyToManyField(to='tracking.parcel'),
        ),
        migrations.AddField(
            model_name='delivery',
            name='to_place',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='to_place', to='tracking.place'),
        ),
        migrations.AddField(
            model_name='car',
            name='project',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tracking.project'),
        ),
    ]
