from django.contrib import admin
from .models import Skill, SessionRequest, ProgramRSVP, Review

admin.site.register(Skill)
admin.site.register(SessionRequest)
admin.site.register(ProgramRSVP)
admin.site.register(Review)
