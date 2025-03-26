from django.db import models

class Skill(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    skill_type = models.CharField(max_length=100, default="General")
    sub_skill = models.CharField(max_length=100, default="Other")
    level = models.CharField(max_length=50, default="Beginner")
    price = models.DecimalField(max_digits=6, decimal_places=2, default=0)
    mentor_name = models.CharField(max_length=100)
    availability = models.CharField(max_length=100, default="Flexible")
    location = models.CharField(max_length=100, default="On-Campus")
    iimage = models.ImageField(upload_to='skill_images/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class SessionRequest(models.Model):
    skill = models.ForeignKey(Skill, on_delete=models.CASCADE)
    student_name = models.CharField(max_length=100)
    message = models.TextField()
    requested_at = models.DateTimeField(auto_now_add=True)

class ProgramRSVP(models.Model):
    skill = models.ForeignKey(Skill, on_delete=models.CASCADE)
    student_name = models.CharField(max_length=100)
    reserved_at = models.DateTimeField(auto_now_add=True)

class Review(models.Model):
    skill = models.ForeignKey(Skill, on_delete=models.CASCADE)
    student_name = models.CharField(max_length=100)
    rating = models.IntegerField()
    comment = models.TextField()
    reviewed_at = models.DateTimeField(auto_now_add=True)
