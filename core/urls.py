from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.shortcuts import redirect
from django.urls import include, path
from rest_framework.authtoken import views

urlpatterns = (
    [
        path("", lambda _: redirect("api/")),
        path("", include("apps.medical.urls")),
        path("api/", include("apps.api.urls")),
        path("admin/", admin.site.urls),
        path("auth/", include("django.contrib.auth.urls")),
        path("api/auth/", include("rest_framework.urls")),
        path("api/token/", views.obtain_auth_token),
        # path("__debug__/", include("debug_toolbar.urls")),
    ]
    + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
)
