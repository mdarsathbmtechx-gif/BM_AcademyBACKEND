from django.shortcuts import render
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .models import Certificate
from .serializers import CertificateSerializer

from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
import io
from django.core.files.base import ContentFile
from datetime import datetime


class CertificateViewSet(viewsets.ModelViewSet):
    """
    Certificate management for Admin & Students.

    - Admins can issue, view, update, and delete certificates.
    - Students can only view their own certificates.
    """
    queryset = Certificate.objects.all().order_by('-issue_date')
    serializer_class = CertificateSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """Limit certificates to the current user unless admin."""
        user = self.request.user
        if user.is_staff:
            return Certificate.objects.all().order_by('-issue_date')
        return Certificate.objects.filter(user=user).order_by('-issue_date')

    def perform_create(self, serializer):
        """
        Automatically generate a PDF certificate when issued.
        """
        certificate = serializer.save()

        # Create PDF in memory
        buffer = io.BytesIO()
        pdf = canvas.Canvas(buffer, pagesize=A4)

        # Page title and layout
        pdf.setTitle("BM Academy Certificate")
        width, height = A4

        # Draw content
        pdf.setFont("Helvetica-Bold", 26)
        pdf.drawCentredString(width / 2, height - 100, "BM ACADEMY")

        pdf.setFont("Helvetica-Bold", 22)
        pdf.drawCentredString(width / 2, height - 160, "Certificate of Achievement")

        pdf.setFont("Helvetica", 16)
        pdf.drawCentredString(width / 2, height - 220, "This is proudly presented to")

        pdf.setFont("Helvetica-Bold", 20)
        pdf.drawCentredString(width / 2, height - 260, certificate.user.get_full_name() or certificate.user.username)

        pdf.setFont("Helvetica", 14)
        pdf.drawCentredString(width / 2, height - 300, f"For successfully completing the course:")
        pdf.setFont("Helvetica-Bold", 16)
        pdf.drawCentredString(width / 2, height - 330, certificate.course.name)

        pdf.setFont("Helvetica", 12)
        pdf.drawCentredString(width / 2, height - 380, f"Issued on: {certificate.issue_date.strftime('%d %B %Y')}")

        pdf.line(100, height - 420, width - 100, height - 420)
        pdf.setFont("Helvetica-Oblique", 10)
        pdf.drawCentredString(width / 2, height - 440, "Authorized by BM Academy")

        # Finalize PDF
        pdf.showPage()
        pdf.save()
        buffer.seek(0)

        # Save PDF to FileField
        filename = f"BM_CERT_{certificate.certificate_id}.pdf"
        certificate.file.save(filename, ContentFile(buffer.read()))

        buffer.close()

    def create(self, request, *args, **kwargs):
        """
        Override create() for better error handling & response.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(
            {"message": "Certificate issued successfully!", "data": serializer.data},
            status=status.HTTP_201_CREATED
        )
