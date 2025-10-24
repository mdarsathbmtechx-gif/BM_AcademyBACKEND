from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CertificateViewSet

# Create a router and register our viewset
router = DefaultRouter()
router.register(r'certificates', CertificateViewSet, basename='certificate')

urlpatterns = [
    path('', include(router.urls)),
]
