from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin, auth
from django.contrib.auth.models import User
from django.shortcuts import redirect
from django.urls import include, path
from rest_framework import routers, serializers, viewsets
from rest_framework.authtoken import views


# Serializers define the API representation.
class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ["url", "username", "email", "is_staff"]


# ViewSets define the view behavior.
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


# Routers provide an easy way of automatically determining the URL conf.
api_router = routers.DefaultRouter()
api_router.register(r"users", UserViewSet)


urlpatterns = (
    [
        # path("", lambda _: redirect("medical/")),
        path("admin/", admin.site.urls),
        path("auth/", include("django.contrib.auth.urls")),
        path("", include("apps.medical.urls")),
        path("api/auth/", include("rest_framework.urls")),
        path("api/token/", views.obtain_auth_token),
        path("api/", include(api_router.urls)),
    ]
    + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
)
