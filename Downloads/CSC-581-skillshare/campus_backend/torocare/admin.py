from django.contrib import admin
from .models import CareProvider, Appointment, HealthEvent

admin.site.register(CareProvider)
admin.site.register(Appointment)
admin.site.register(HealthEvent)
