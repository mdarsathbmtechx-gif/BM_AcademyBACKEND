from rest_framework import serializers
from .models import Certificate

class CertificateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Certificate
        fields = ['id', 'user', 'course', 'issue_date', 'file']
        read_only_fields = ['id', 'issue_date', 'file']
