from rest_framework import generics, permissions
from .models import ContactMessage
from .serializers import ContactMessageSerializer
from django.core.mail import send_mail
from django.conf import settings
from threading import Thread

# ✅ Helper function to send email in a separate thread
def send_email_async(subject, message, from_email, recipient_list):
    Thread(
        target=send_mail,
        args=(subject, message, from_email, recipient_list),
        kwargs={'fail_silently': False}
    ).start()

class ContactMessageCreateView(generics.CreateAPIView):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    permission_classes = [permissions.AllowAny]

    def perform_create(self, serializer):
        # Save the contact message to the database
        instance = serializer.save()

        # Prepare email content
        subject = f"New Contact Message: {instance.subject or 'No Subject'}"
        message = f"""
You have a new contact form submission:

Name: {instance.name}
Email: {instance.email}
Subject: {instance.subject}
Message:
{instance.message}
"""
        from_email = settings.DEFAULT_FROM_EMAIL
        recipient_list = [settings.EMAIL_HOST_USER]

        # Send email asynchronously
        try:
            send_email_async(subject, message, from_email, recipient_list)
        except Exception as e:
            # Log any errors without crashing the API
            print("Email sending failed:", e)
