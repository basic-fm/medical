from django.contrib.auth.models import Group, User
from rest_framework import serializers

from ..medical.models import Car, Delivery, Parcel, Place, Project, Receit


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ["url", "username", "email", "groups"]


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ["url", "name"]


class ProjectSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Project
        fields = ["url", "id", "name"]


class CarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Car
        fields = ["id", "name"]


class PlaceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Place
        fields = ["id", "name"]


class ParcelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Parcel
        fields = ["id", "barcode_data", "barcode_type"]


class ReceitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Receit
        fields = ["id", "name", "image"]


class DeliveryWriteSerializer(serializers.ModelSerializer):
    parcels = ParcelSerializer(many=True)
    driver = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Delivery
        fields = [
            "id",
            "from_place",
            "to_place",
            "car",
            "driver",
            "parcels",
            "receit",
            "created_at",
            "delivered_at",
        ]

    def create(self, validated_data):
        parcels = validated_data.pop("parcels")

        delivery = Delivery.objects.create(**validated_data)
        for parcel in parcels:
            obj, created = Parcel.objects.get_or_create(**parcel)
            delivery.parcels.add(obj or created)

        delivery.save()

        return delivery


class DeliveryReadSerializer(serializers.ModelSerializer):
    from_place = PlaceSerializer(many=False)
    to_place = PlaceSerializer(many=False)
    parcels = ParcelSerializer(many=True)

    class Meta:
        model = Delivery
        fields = [
            "id",
            "from_place",
            "to_place",
            "car",
            "driver",
            "parcels",
            "receit",
            "created_at",
            "delivered_at",
        ]
