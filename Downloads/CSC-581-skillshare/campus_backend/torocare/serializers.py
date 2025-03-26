from rest_framework import serializers
from .models import CareProvider, Appointment, HealthEvent

class CareProviderSerializer(serializers.ModelSerializer):
    class Meta:
        model = CareProvider
        fields = '__all__'

class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = '__all__'

class HealthEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = HealthEvent
        fields = '__all__'
