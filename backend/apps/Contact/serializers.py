from rest_framework import serializers

class ContactFormSerializer(serializers.Serializer):
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    email = serializers.EmailField()
    phone = serializers.RegexField(
        regex=r'^\+?1?\d{9,15}$',
        error_messages={
        'invalid': 'Phone number must be entered in the format: "+999999999".'
    },
        required=False,
    )
    message = serializers.CharField()