from django.contrib import admin

from .models import Car, Delivery, Parcel, Place, Project, Receit

# Register your models here.

admin.site.register(Project)
admin.site.register(Car)
admin.site.register(Place)
admin.site.register(Parcel)
admin.site.register(Delivery)
admin.site.register(Receit)
