from rest_framework import viewsets
from .models import Skill, SessionRequest, ProgramRSVP, Review
from .serializers import SkillSerializer, SessionRequestSerializer, ProgramRSVPSerializer, ReviewSerializer

class SkillViewSet(viewsets.ModelViewSet):
    queryset = Skill.objects.all().order_by('-created_at')
    serializer_class = SkillSerializer

class SessionRequestViewSet(viewsets.ModelViewSet):
    queryset = SessionRequest.objects.all()
    serializer_class = SessionRequestSerializer

class ProgramRSVPViewSet(viewsets.ModelViewSet):
    queryset = ProgramRSVP.objects.all()
    serializer_class = ProgramRSVPSerializer

class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
