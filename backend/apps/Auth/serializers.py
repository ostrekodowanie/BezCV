from django.db.models import F, Avg, Sum
from django.utils import timezone

from rest_framework import serializers
from rest_framework.validators import ValidationError

from datetime import timedelta

from .models import User
from apps.Candidates.models import CandidateAbilities, Candidates, PurchasedOffers

from nip24 import *


nip24 = NIP24Client(os.environ.get('NIP24_ID'), os.environ.get('NIP24_KEY'))


class SignUpSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
            error_messages={
                'unique': 'Email jest już przypisany do istniejącego konta'
            }
        )
    nip = serializers.CharField(
            error_messages={
                'unique': 'NIP jest już przypisany do istniejącego konta'
            }
        )
    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'email', 'nip', 'password')
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        email = validated_data.get('email')
        if User.objects.filter(email=email).exists():
            raise ValidationError('Email jest już przypisany do istniejącego konta')
        nip = validated_data.get('nip')
        if User.objects.filter(nip=nip).exists():
            raise ValidationError('NIP jest już przypisany do istniejącego konta')
        # active = nip24.isActiveExt(Number.NIP, nip)
        # if not active:
        #     if not nip24.getLastError():
        #         raise ValidationError('Firma zawiesiła lub zakończyła działalność')
        #     else:
        #         raise ValidationError(nip24.getLastError())
            
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)

        if password is not None:
            instance.set_password(password)
            
        instance.save()

        return instance


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model =  User
        fields = ('first_name', 'last_name', 'points', 'is_staff', 'nip', 'company_name', 'image', 'desc', 'email', 'form')


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
        
        user = self.context['request'].user
        purchased = PurchasedOffers.objects.filter(employer=user, candidate=instance).exists()
        
        if purchased:
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
        candidate_abilities = CandidateAbilities.objects.filter(candidate_id=instance.id).values('ability__abilityquestions_ability__question__category__name').annotate(average_percentage=Avg('percentage')).order_by('-average_percentage')

        abilities_dict = {}
        for ability in candidate_abilities:
            category = ability['ability__abilityquestions_ability__question__category__name']
            average = round(ability['average_percentage'])
            abilities_dict[category] = average

        return abilities_dict
    
    
class EmployerProfilePurchasedSerializer(serializers.ModelSerializer):
    class Meta:
        model =  Candidates
        fields = ('id', 'first_name', 'last_name', 'phone', 'profession')


