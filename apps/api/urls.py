from django.urls import include, path
from rest_framework import routers

from .views import DeliverySet, ProjectViewSet, UserViewSet

router = routers.DefaultRouter()
router.register(r"users", UserViewSet)
router.register(r"projects", ProjectViewSet)
router.register(r"deliveries", DeliverySet)


urlpatterns = [
    path("", include(router.urls)),
]
