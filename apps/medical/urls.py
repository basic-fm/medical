from django.urls import path

from .views import AuthoListView, AuthorCreateView

urlpatterns = [
    path("", AuthoListView.as_view(), name="author-list"),
    path("create/", AuthorCreateView.as_view()),
]
