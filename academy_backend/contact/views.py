# contact/views.py
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .models import ContactMessage
from .serializers import ContactMessageSerializer
from django.core.mail import send_mail
from django.conf import settings

class ContactMessageCreateView(generics.GenericAPIView):
    serializer_class = ContactMessageSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # Save to MongoDB
        instance = ContactMessage(**serializer.validated_data)
        instance.save()

        # Send email notification
        try:
            send_mail(
                subject=f"New Contact Message: {instance.subject or 'No Subject'}",
                message=f"""
You have a new contact form submission:

Name: {instance.name}
Email: {instance.email}
Subject: {instance.subject}
Message:
{instance.message}
""",
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[settings.EMAIL_HOST_USER],
                fail_silently=False,
            )
        except Exception as e:
            print("Email sending failed:", e)

        # Return saved data
        return Response({
            "id": str(instance.id),  # MongoDB ID
            "name": instance.name,
            "email": instance.email,
            "subject": instance.subject,
            "message": instance.message,
            "created_at": instance.created_at
        }, status=status.HTTP_201_CREATED)
