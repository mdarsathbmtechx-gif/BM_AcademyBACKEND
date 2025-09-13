from django.urls import path
from .views import CourseListView, CourseCreateView, EnrollmentView

urlpatterns = [
    path("", CourseListView.as_view(), name="courses-list"),
    path("create/", CourseCreateView.as_view(), name="courses-create"),
    path("enrollments/", EnrollmentView.as_view(), name="enrollments"),
]
