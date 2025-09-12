# courses/admin.py
from django.contrib import admin
from .models import Course, Enrollment

@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ("title", "instructor_display", "created_at")
    raw_id_fields = ("instructor",)  # safer for Djongo/MongoDB
    list_filter = ("created_at",)
    search_fields = ("title", "instructor__username")
    ordering = ("-created_at",)

    def instructor_display(self, obj):
        return obj.instructor.username if obj.instructor else "-"
    instructor_display.short_description = "Instructor"


@admin.register(Enrollment)
class EnrollmentAdmin(admin.ModelAdmin):
    list_display = ("student_display", "course_display", "enrolled_at")
    raw_id_fields = ("student", "course")  # safer for Djongo/MongoDB
    search_fields = ("student__username", "course__title")
    list_filter = ("enrolled_at", "course__title")
    ordering = ("-enrolled_at",)

    def student_display(self, obj):
        return obj.student.username if obj.student else "-"

    def course_display(self, obj):
        return obj.course.title if obj.course else "-"
