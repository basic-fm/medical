from django.urls import re_path

from .views import FrontendView

urlpatterns = [
    re_path(r'^frontend/.*', FrontendView.as_view(), name="index"),
]
