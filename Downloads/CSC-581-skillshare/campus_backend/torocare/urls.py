from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CareProviderViewSet, AppointmentViewSet, HealthEventViewSet

router = DefaultRouter()
router.register(r'providers', CareProviderViewSet)
router.register(r'appointments', AppointmentViewSet)
router.register(r'events', HealthEventViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
