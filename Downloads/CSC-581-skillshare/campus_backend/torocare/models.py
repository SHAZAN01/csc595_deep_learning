from django.db import models

class CareProvider(models.Model):
    name = models.CharField(max_length=100)
    specialization = models.CharField(max_length=100)
    availability = models.TextField()
    contact = models.CharField(max_length=100)
    image = models.ImageField(upload_to='care_providers/')

    def __str__(self):
        return self.name

class Appointment(models.Model):
    student_name = models.CharField(max_length=100)
    provider = models.ForeignKey(CareProvider, on_delete=models.CASCADE)
    date = models.DateTimeField()
    symptoms = models.TextField()
    status = models.CharField(max_length=50, default="Pending")

    def __str__(self):
        return f"{self.student_name} → {self.provider.name}"

class HealthEvent(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    date = models.DateTimeField()
    image = models.ImageField(upload_to='event_images/')
    rsvp_count = models.IntegerField(default=0)

    def __str__(self):
        return self.title
