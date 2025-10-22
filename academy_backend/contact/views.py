# contact/views.py
import threading
from django.core.mail import send_mail
from django.conf import settings
from rest_framework import generics, permissions, status
from rest_framework.response import Response

from .models import ContactMessage
from .serializers import ContactMessageSerializer


def send_email_in_background(subject, message):
    """Run send_mail in a background thread."""
    try:
        send_mail(
            subject=subject,
            message=message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[settings.EMAIL_HOST_USER],
            fail_silently=False,
        )
    except Exception as e:
        print("Email sending failed:", e)


class ContactMessageCreateView(generics.GenericAPIView):
    serializer_class = ContactMessageSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        instance = ContactMessage(**serializer.validated_data)
        instance.save()

        subject = f"New Contact Message: {instance.subject or 'No Subject'}"
        message = f"""
You have a new contact form submission:

Name: {instance.name}
Email: {instance.email}
Subject: {instance.subject}
Message:
{instance.message}
"""

        threading.Thread(
            target=send_email_in_background,
            args=(subject, message)
        ).start()

        return Response({
            "id": str(instance.id),
            "name": instance.name,
            "email": instance.email,
            "subject": instance.subject,
            "message": instance.message,
            "created_at": instance.created_at
        }, status=status.HTTP_201_CREATED)
