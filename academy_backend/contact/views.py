# contact/views.py
from django.core.mail import send_mail
from django.conf import settings
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .models import ContactMessage
from .serializers import ContactMessageSerializer

def send_email(subject, message):
    """Send email and print errors if any."""
    try:
        send_mail(
            subject=subject,
            message=message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[settings.EMAIL_HOST_USER],
            fail_silently=False,
        )
    except Exception as e:
        import traceback
        print("Email sending failed:", e)
        traceback.print_exc()

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

        # Call directly for now
        send_email(subject, message)

        return Response({
            "id": str(instance.id),
            "name": instance.name,
            "email": instance.email,
            "subject": instance.subject,
            "message": instance.message,
            "created_at": instance.created_at
        }, status=status.HTTP_201_CREATED)
