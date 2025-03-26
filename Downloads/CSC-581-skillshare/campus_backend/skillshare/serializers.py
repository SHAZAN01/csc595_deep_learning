from rest_framework import serializers
from .models import Skill, SessionRequest, ProgramRSVP, Review

class SkillSerializer(serializers.ModelSerializer):
    average_rating = serializers.SerializerMethodField()

    class Meta:
        model = Skill
        fields = '__all__'

    def get_average_rating(self, obj):
        reviews = Review.objects.filter(skill=obj)
        if reviews.exists():
            return round(sum([r.rating for r in reviews]) / reviews.count(), 2)
        return None

class SessionRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = SessionRequest
        fields = '__all__'

class ProgramRSVPSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProgramRSVP
        fields = '__all__'

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'
