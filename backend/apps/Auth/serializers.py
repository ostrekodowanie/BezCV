from django.db.models import F, Avg, Sum
from django.utils import timezone

from rest_framework import serializers, status
from rest_framework.validators import ValidationError
from rest_framework.response import Response

from datetime import timedelta

from .models import User
from apps.Candidates.models import Candidates
from apps.Codes.models import UsedCodes, Codes

from nip24 import *


nip24 = NIP24Client(os.environ.get('NIP24_ID'), os.environ.get('NIP24_KEY'))


class SignUpSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
            error_messages={
                'unique': 'Email jest już przypisany do istniejącego konta'
            }
        )
    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'email', 'nip', 'password')
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        instance = self.Meta.model(**validated_data)
        
        email = validated_data.get('email')
        if User.objects.filter(email=email).exists():
            raise ValidationError('Email jest już przypisany do istniejącego konta')
        nip = validated_data.get('nip')
        active = nip24.isActiveExt(Number.NIP, nip)
        if not active:
            if not nip24.getLastError():
                raise ValidationError('Firma zawiesiła lub zakończyła działalność')
            else:
                raise ValidationError(nip24.getLastError())
            
        password = validated_data.pop('password', None)

        if password is not None:
            instance.set_password(password)
            
        instance.save()

        return instance


class UserSerializer(serializers.ModelSerializer):
    points = serializers.SerializerMethodField()
    
    class Meta:
        model =  User
        fields = ('first_name', 'last_name', 'points', 'is_staff', 'nip', 'company_name', 'image', 'desc', 'email', 'form')
        
    def get_points(self, obj):
        purchased_tokens = obj.purchasedpoints_employer.filter(expiration_date__gt=timezone.now(), remaining_tokens__gt=0).aggregate(Sum('remaining_tokens'))['remaining_tokens__sum'] or 0
            
        remaining_tokens = purchased_tokens + obj.tokens
        
        return remaining_tokens


class UpdateUserSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(required=False)

    class Meta:
        model =  User
        fields = ('first_name', 'last_name', 'email', 'desc', 'image', 'form')


class EmployerProfileSerializer(serializers.ModelSerializer):
    stats = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = (
            'stats',
            )
        
    def to_representation(self, instance):
        employer_data = super().to_representation(instance)
        employer = {
            'stats': employer_data.pop('stats'),
        }
        return employer
    
    def get_stats(self, obj):
        followed_count = len(obj.favouritecandidates_employer.all())
        purchased_count = len(obj.purchasedoffers_employer.all())
        stats_dict = {
            'followed_count': followed_count,
            'purchased_count': purchased_count
        }
        return stats_dict

class EmployerProfileFollowedSerializer(serializers.ModelSerializer):
    percentage_by_category = serializers.SerializerMethodField()
    
    class Meta:
        model =  Candidates
        fields = (
            'id', 
            'first_name', 
            'last_name',
            'phone',
            'profession', 
            'job_position', 
            'salary_expectation', 
            'availability',
            'province',
            'education',
            'driving_license',
            'has_job',
            'percentage_by_category'
        )
        
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        
        purchased = instance.purchasedoffers_candidate.filter(employer=self.context['request'].user).exists()
        
        if not purchased:
            hidden_first_name = instance.first_name[0] + '*' * (len(instance.first_name) - 1)
            hidden_last_name = instance.last_name[0] + '*' * (len(instance.last_name) - 1)
            email_parts = instance.email.split('@')
            hidden_email = email_parts[0][0] + '*' * (len(email_parts[0]) - 1) + '@' + email_parts[1]
            
            representation['first_name'] = hidden_first_name
            representation['last_name'] = hidden_last_name
            representation['email'] = hidden_email
            representation['phone'] = '*********'
            
        return representation

    def get_percentage_by_category(self, instance):
        completed_surveys = instance.completed_surveys
        
        category_dict = {}
        for category_name in completed_surveys:
            abilities = instance.candidateabilities_candidate.filter(ability__abilityquestions_ability__question__category__name=category_name).annotate(
                category=F('ability__abilityquestions_ability__question__category__name')
            ).values('category').annotate(average_percentage=Avg('percentage')).order_by('-average_percentage')
            
            category_dict[category_name] = round(abilities[0]['average_percentage'])
            
        return category_dict
    
    
class EmployerProfilePurchasedSerializer(serializers.ModelSerializer):
    class Meta:
        model =  Candidates
        fields = ('id', 'first_name', 'last_name', 'phone', 'profession')


