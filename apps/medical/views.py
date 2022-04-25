from django.shortcuts import render
from django.views.generic.edit import CreateView
from django.views.generic.list import ListView
from django.urls import reverse_lazy

from .models import Medical


class AuthorCreateView(CreateView):
    model = Medical
    fields = ["name", "description", "price", "image"]
    success_url = reverse_lazy('author-list')


class AuthoListView(ListView):
    model = Medical
    paginate_by = 100

