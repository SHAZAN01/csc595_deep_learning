from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SkillViewSet, SessionRequestViewSet, ProgramRSVPViewSet, ReviewViewSet

router = DefaultRouter()
router.register(r'skills', SkillViewSet)
router.register(r'session-requests', SessionRequestViewSet)
router.register(r'rsvp', ProgramRSVPViewSet)
router.register(r'reviews', ReviewViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
