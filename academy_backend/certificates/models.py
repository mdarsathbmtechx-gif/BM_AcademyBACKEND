from django.db import models

# Create your models here.
from django.db import models
from django.contrib.auth.models import User
from courses.models import Course  # assuming you have this

class Certificate(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='certificates')
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    issue_date = models.DateField(auto_now_add=True)
    certificate_id = models.CharField(max_length=20, unique=True)
    file = models.FileField(upload_to='certificates/', blank=True, null=True)  # optional PDF
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.user.username} - {self.course.name}"
