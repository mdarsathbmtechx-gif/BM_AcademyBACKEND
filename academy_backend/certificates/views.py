from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Certificate
from .serializers import CertificateSerializer
from courses.models import Course
from users.models import User as MongoUser
from bson import ObjectId
from .authentication import MongoJWTAuthentication
from .permissions import IsMongoAdmin
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
from django.core.files.base import ContentFile
import io
from datetime import datetime

class CertificateViewSet(viewsets.ModelViewSet):
    queryset = Certificate.objects.all().order_by("-issue_date")
    serializer_class = CertificateSerializer
    authentication_classes = [MongoJWTAuthentication]
    permission_classes = [IsMongoAdmin]

    def perform_create(self, serializer):
        # ✅ Generate unique certificate ID
        certificate_id = "CERT" + str(int(datetime.now().timestamp()))
        certificate = serializer.save(certificate_id=certificate_id)

        # --- Get user and course info ---
        user_name, course_title = "Unknown User", "Unknown Course"
        try:
            user = MongoUser.objects.get(id=ObjectId(certificate.user_id))
            user_name = getattr(user, "name", "") or user.email
        except:
            pass

        try:
            course = Course.objects.get(id=ObjectId(certificate.course_id))
            course_title = course.title
        except:
            pass

        # --- Generate PDF ---
        buffer = io.BytesIO()
        pdf = canvas.Canvas(buffer, pagesize=A4)
        width, height = A4
        pdf.setTitle("BM Academy Certificate")

        pdf.setFont("Helvetica-Bold", 26)
        pdf.drawCentredString(width / 2, height - 100, "BM ACADEMY")
        pdf.setFont("Helvetica-Bold", 22)
        pdf.drawCentredString(width / 2, height - 160, "Certificate of Achievement")
        pdf.setFont("Helvetica", 16)
        pdf.drawCentredString(width / 2, height - 220, "This is proudly presented to")
        pdf.setFont("Helvetica-Bold", 20)
        pdf.drawCentredString(width / 2, height - 260, user_name)
        pdf.setFont("Helvetica", 14)
        pdf.drawCentredString(width / 2, height - 300, "For successfully completing:")
        pdf.setFont("Helvetica-Bold", 16)
        pdf.drawCentredString(width / 2, height - 330, course_title)
        pdf.setFont("Helvetica", 12)
        pdf.drawCentredString(
            width / 2, height - 380,
            f"Issued on: {certificate.issue_date.strftime('%d %B %Y')}"
        )
        pdf.line(100, height - 420, width - 100, height - 420)
        pdf.setFont("Helvetica-Oblique", 10)
        pdf.drawCentredString(width / 2, height - 440, "Authorized by BM Academy")

        pdf.showPage()
        pdf.save()
        buffer.seek(0)

        filename = f"BM_CERT_{certificate.certificate_id}.pdf"
        certificate.file.save(filename, ContentFile(buffer.read()))
        buffer.close()

    # --- CREATE API ---
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        cert = serializer.instance

        # Return response
        user_name, course_name = "Unknown User", "Unknown Course"
        try:
            user = MongoUser.objects.get(id=ObjectId(cert.user_id))
            user_name = getattr(user, "name", "") or user.email
        except:
            pass
        try:
            course = Course.objects.get(id=ObjectId(cert.course_id))
            course_name = course.title
        except:
            pass

        data = {
            "id": cert.id,
            "certificate_id": cert.certificate_id,
            "user_name": user_name,
            "course_name": course_name,
            "issue_date": cert.issue_date,
            "file": cert.file.url if cert.file else None,
        }

        return Response(
            {"message": "Certificate issued successfully!", "data": data},
            status=status.HTTP_201_CREATED,
        )

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        data = []

        for cert in queryset:
            user_name, course_name = "Unknown User", "Unknown Course"
            try:
                user = MongoUser.objects.get(id=ObjectId(cert.user_id))
                user_name = getattr(user, "name", "") or user.email
            except:
                pass
            try:
                course = Course.objects.get(id=ObjectId(cert.course_id))
                course_name = course.title
            except:
                pass

            data.append({
                "id": cert.id,
                "certificate_id": cert.certificate_id,
                "user_name": user_name,
                "course_name": course_name,
                "issue_date": cert.issue_date,
                "file": request.build_absolute_uri(cert.file.url) if cert.file else None,
            })

        return Response({"data": data})



# ------------------------------
# VERIFY CERTIFICATE
# ------------------------------
from rest_framework.decorators import api_view

@api_view(["GET"])
def verify_certificate(request, certificate_id):
    try:
        cert = Certificate.objects.get(certificate_id=certificate_id)
        user_name, course_name = "Unknown User", "Unknown Course"

        try:
            user = MongoUser.objects.get(id=ObjectId(cert.user_id))
            user_name = getattr(user, "name", "") or user.email
        except:
            pass

        try:
            course = Course.objects.get(id=ObjectId(cert.course_id))
            course_name = course.title
        except:
            pass

        return Response({
            "valid": True,
            "name": user_name,
            "course": course_name,
            "issuedDate": cert.issue_date.strftime("%d %B %Y"),
            "file": request.build_absolute_uri(cert.file.url) if cert.file else None
        })
    except Certificate.DoesNotExist:
        return Response({"valid": False})



# ------------------------------
# DOWNLOAD CERTIFICATE
# ------------------------------
from django.http import FileResponse

@api_view(["GET"])
def download_certificate(request, certificate_id):
    try:
        cert = Certificate.objects.get(certificate_id=certificate_id)
        return FileResponse(cert.file.open("rb"), as_attachment=True, filename=f"{cert.certificate_id}.pdf")
    except Certificate.DoesNotExist:
        return Response({"error": "Certificate not found"}, status=404)
