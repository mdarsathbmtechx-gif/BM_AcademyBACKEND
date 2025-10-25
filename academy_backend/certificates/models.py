# certificates/models.py
from django.db import models

class Certificate(models.Model):
    user_id = models.CharField(max_length=24)  # MongoDB User ObjectId
    course_id = models.CharField(max_length=24)  # MongoDB Course ObjectId
    certificate_id = models.CharField(max_length=50, unique=True, blank=True)
    issue_date = models.DateTimeField(auto_now_add=True)
    file = models.FileField(upload_to="certificates/", null=True, blank=True)

    def __str__(self):
        return f"User {self.user_id} - Course {self.course_id}"
