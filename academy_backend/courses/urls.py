from django.urls import path, include
from .views import CourseListCreateAPIView, CourseRetrieveUpdateDeleteView, CourseDetailAPIView
from .views import create_order, confirm_payment


urlpatterns = [
    path('courses/', CourseListCreateAPIView.as_view(), name='api-course-list-create'),  # list endpoint
    path('courses/<str:pk>/', CourseDetailAPIView.as_view(), name='api-course-detail'),  
    path('courses/<str:pk>/', CourseRetrieveUpdateDeleteView.as_view(), name='course-detail'),
    path("api/auth/", include("users.urls")),

    # FIXED ROUTES
    path('api/courses/create_order/', create_order, name='create_order'),
    path('api/courses/confirm_payment/', confirm_payment, name='confirm_payment'),
]

