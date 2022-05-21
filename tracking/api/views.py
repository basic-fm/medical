from django.contrib.auth import get_user_model
from django.utils import timezone
from django_filters import rest_framework as filters
from rest_framework import permissions, viewsets
from rest_framework.decorators import action
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.response import Response
from tracking.models import Car, Delivery, Place, Project

User = get_user_model()

from .serializers import (
    CarSerializer,
    DeliveryReadSerializer,
    DeliveryWriteSerializer,
    PlaceSerializer,
    ProjectSerializer,
    ReceitSerializer,
    UserSerializer,
)


class DeliveryFilter(filters.FilterSet):
    not_delivered = filters.BooleanFilter(
        field_name="delivered_at",
        lookup_expr="isnull",
    )

    class Meta:
        model = Delivery
        fields = ["car"]


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by("-date_joined")
    serializer_class = UserSerializer

    @action(
        detail=False,
        methods=["get"],
        permission_classes=[permissions.DjangoModelPermissionsOrAnonReadOnly],
    )
    def current_user(self, request, pk=None):
        if not request.user.is_authenticated:
            return Response(None)

        serializer = self.get_serializer(request.user)
        return Response(serializer.data)


class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

    @action(detail=False, methods=["get"])
    def my_projects(self, request):
        projects = Project.objects.filter(members__id=request.user.id)
        serializer = ProjectSerializer(
            projects, many=True, context={"request": request}
        )

        return Response(serializer.data)

    @action(detail=True, methods=["get"])
    def cars(self, request, pk=None):
        cars = Car.objects.filter(project=pk).all()
        serializer = CarSerializer(cars, many=True, context={request})

        return Response(serializer.data)

    @action(detail=True, methods=["get"])
    def places(self, request, pk=None):
        places = Place.objects.filter(project=pk).all()
        serializer = PlaceSerializer(places, many=True, context={request})

        return Response(serializer.data)


class DeliverySet(viewsets.ModelViewSet):
    queryset = Delivery.objects.all()

    filterset_class = DeliveryFilter
    serializer_classes = {
        "retrieve": DeliveryReadSerializer,
        "list": DeliveryReadSerializer,
        "default": DeliveryWriteSerializer,
    }

    @action(
        detail=True,
        methods=["post"],
        parser_classes=[MultiPartParser, FormParser],
        serializer_classes={"default": ReceitSerializer},
    )
    def finish_delivery(self, request, pk=None):
        serializer = ReceitSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(delivery_id=pk)

        delivery = Delivery.objects.get(id=pk)
        delivery.delivered_at = timezone.now()
        delivery.save()

        return Response(serializer.data)

    def get_serializer_class(self):
        return self.serializer_classes.get(
            self.action, self.serializer_classes["default"]
        )
