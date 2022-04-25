from django.contrib.auth.models import User
from django.db import models


# Create your models here.
class Medical(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to="medical")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Driver(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)


class Project(models.Model):
    name = models.CharField(max_length=100)


class Place(models.Model):
    name = models.CharField(max_length=100)


class Car(models.Model):
    name = models.CharField(max_length=100)


class Parcel(models.Model):
    barcode_data = models.CharField(max_length=100)
    barcode_type = models.CharField(max_length=100)


# class Delivery(models.Model):
#     pass


# class Receit(models.Model):
#     pass
