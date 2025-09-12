from django.db import models
from django.conf import settings

class Course(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    instructor = models.ForeignKey(
    settings.AUTH_USER_MODEL,
    on_delete=models.SET_NULL,
    null=True, blank=True,
    related_name="courses",
    limit_choices_to={'is_staff': True}  # Only staff can be instructors
)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class Enrollment(models.Model):
    student = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.SET_NULL,  # safer for MongoDB
        null=True, blank=True,
        related_name="enrollments"
    )
    course = models.ForeignKey(
        Course, 
        on_delete=models.SET_NULL,  # safer for MongoDB
        null=True, blank=True,
        related_name="enrollments"
    )
    enrolled_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.student.username if self.student else 'Unknown'} -> {self.course.title if self.course else 'Unknown'}"
