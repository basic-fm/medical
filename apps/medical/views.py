from django.forms import ModelForm
from django.shortcuts import render
from django.urls import reverse_lazy
from django.views.generic.edit import FormView
from django.views.generic.list import ListView

from .models import Medical


class AuthorForm(ModelForm):
    # template_name = "snippets/form_snippet.html"

    class Meta:
        model = Medical
        fields = ["name", "description", "price", "image"]


class AuthorCreateView(FormView):
    template_name = "medical/medical_form.html"
    form_class = AuthorForm
    success_url = reverse_lazy("author-list")


class AuthoListView(ListView):
    model = Medical
