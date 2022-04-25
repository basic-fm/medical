
from .views import AuthoListView, AuthorCreateView
from django.urls import path


urlpatterns = [
    path("", AuthoListView.as_view()),
    path("create/", AuthorCreateView.as_view()),
]
