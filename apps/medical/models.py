import os
import re

from django.contrib.auth.models import User
from django.db import models


class Project(models.Model):
    name = models.CharField(max_length=100)
    members = models.ManyToManyField(User, related_name="projects")

    def __str__(self):
        return self.name


class Place(models.Model):
    name = models.CharField(max_length=100)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class Car(models.Model):
    name = models.CharField(max_length=100)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class Parcel(models.Model):
    barcode_data = models.CharField(max_length=100)
    barcode_type = models.CharField(max_length=100)

    def __str__(self):
        return "Parcel #" + str(self.id)


def get_upload_path(instance, filename):
    return os.path.join(
        "receits/",
        str(instance.delivery.id),
        re.sub(r"[^a-z]", "", instance.name.lower()),
    )


class Receit(models.Model):
    name = models.CharField(max_length=100)
    image = models.ImageField(upload_to=get_upload_path)

    delivery = models.OneToOneField(
        "Delivery",
        on_delete=models.CASCADE,
    )

    def __str__(self):
        return self.name


class Delivery(models.Model):
    parcels = models.ManyToManyField(Parcel)
    from_place = models.ForeignKey(
        Place, on_delete=models.CASCADE, related_name="from_place"
    )
    to_place = models.ForeignKey(
        Place, on_delete=models.CASCADE, related_name="to_place"
    )
    car = models.ForeignKey(Car, on_delete=models.CASCADE)
    driver = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    delivered_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return "# {}: {} -> {}".format(self.id, self.from_place, self.to_place)
