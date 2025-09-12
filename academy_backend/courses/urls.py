# courses/urls.py
from django.urls import path
from .views import UserSignupView, CourseListCreateView, CourseDetailView, EnrollmentListCreateView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    # ----- Authentication -----
    path('users/signup/', UserSignupView.as_view(), name='user-signup'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # ----- Courses -----
    path('courses/', CourseListCreateView.as_view(), name='course-list-create'),
    path('courses/<int:pk>/', CourseDetailView.as_view(), name='course-detail'),

    # ----- Enrollments -----
    path('enrollments/', EnrollmentListCreateView.as_view(), name='enrollment-list-create'),
]
