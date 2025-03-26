from rest_framework import viewsets
from .models import CareProvider, Appointment, HealthEvent
from .serializers import CareProviderSerializer, AppointmentSerializer, HealthEventSerializer

class CareProviderViewSet(viewsets.ModelViewSet):
    queryset = CareProvider.objects.all()
    serializer_class = CareProviderSerializer

class AppointmentViewSet(viewsets.ModelViewSet):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer

class HealthEventViewSet(viewsets.ModelViewSet):
    queryset = HealthEvent.objects.all()
    serializer_class = HealthEventSerializer
