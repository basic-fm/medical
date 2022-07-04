from django.contrib import admin

from .models import Car, Delivery, Parcel, Place, Project, Receit


class ReceitInline(admin.TabularInline):
    model = Receit
    readonly_fields = ["name", "image"]
    can_delete = False


class ParcelAdmin(admin.ModelAdmin):
    search_fields = ["barcode_data"]
    list_display = ["__str__", "barcode_data"]


class DeliveryAdmin(admin.ModelAdmin):
    list_per_page = 20
    list_filter = ["created_at", "delivered_at"]
    list_display = [
        "id",
        "project",
        "from_place",
        "to_place",
        "car",
        "driver",
        "parcel_count",
        "created_at",
        "delivered_at",
    ]
    inlines = [ReceitInline]

    def parcel_count(self, obj: Delivery):
        return obj.parcels.count()

    def project(self, obj):
        return obj.from_place.project

    def get_actions(self, request):
        actions = super().get_actions(request)
        if "delete_selected" in actions:
            del actions["delete_selected"]
        return actions


class HasProjectAdmin(admin.ModelAdmin):
    list_display = ["__str__", "project"]


admin.site.register(Project)
admin.site.register(Car, HasProjectAdmin)
admin.site.register(Place, HasProjectAdmin)
admin.site.register(Parcel, ParcelAdmin)
admin.site.register(Delivery, DeliveryAdmin)
admin.site.register(Receit)
