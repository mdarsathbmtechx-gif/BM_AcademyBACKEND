from django.db import models
from django.contrib.auth.models import User

class Certificate(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    course_id = models.CharField(max_length=24)  # MongoDB ObjectId
    issue_date = models.DateTimeField(auto_now_add=True)
    file = models.FileField(upload_to='certificates/', null=True, blank=True)

    def __str__(self):
        return f"{self.user.username} - {self.course_id}"
