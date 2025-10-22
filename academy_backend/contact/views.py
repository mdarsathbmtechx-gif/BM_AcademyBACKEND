from rest_framework import generics, permissions
from .models import ContactMessage
from .serializers import ContactMessageSerializer
from django.core.mail import send_mail
from django.conf import settings

class ContactMessageCreateView(generics.CreateAPIView):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    permission_classes = [permissions.AllowAny]

    # ✅ This method runs when a new message is saved
    def perform_create(self, serializer):
        # Save the message to the database
        instance = serializer.save()

        # Try sending email, log if it fails
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
            # Log the error instead of crashing
            print("Email sending failed:", e)
