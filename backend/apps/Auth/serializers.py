from django.db.models import F, Avg, Sum
from django.utils import timezone

from rest_framework import serializers
from rest_framework.validators import ValidationError
from rest_framework.response import Response

from datetime import timedelta

from .models import User
from apps.Candidates.models import CandidateAbilities

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
        active = nip24.isActiveExt(Number.NIP, nip)
        if not active:
            if not nip24.getLastError():
                raise ValidationError('Firma zawiesiła lub zakończyła działalność')
            else:
                raise ValidationError(nip24.getLastError())
            
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)

        if password is not None:
            instance.set_password(password)
            
        instance.save()

        return instance


class UserSerializer(serializers.ModelSerializer):
    points = serializers.SerializerMethodField()
    class Meta:
        model =  User
        fields = ('first_name', 'last_name', 'points', 'is_staff', 'nip', 'company_name')
        
    def get_points(self, obj):
        last_month = timezone.now() - timedelta(days=30)
        purchased_tokens = obj.purchasedpoints_employer.filter(
            created_at__gte=last_month
        ).aggregate(Sum('amount'))['amount__sum'] or 0
        
        oldest_token_date = obj.purchasedpoints_employer.filter(
            created_at__gte=last_month
        ).order_by('created_at').values_list('created_at', flat=True).first()
        
        if oldest_token_date:
            purchased_contacts = obj.purchasedoffers_employer.filter(
                created_at__gte=oldest_token_date
            ).count()
        else:
            purchased_contacts = 0

        remaining_tokens = purchased_tokens - purchased_contacts
        return remaining_tokens


class UpdateUserSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(required=False)

    class Meta:
        model =  User
        fields = ('first_name', 'last_name', 'email', 'desc', 'image')


class EmployerProfileSerializer(serializers.ModelSerializer):
    stats = serializers.SerializerMethodField()
    purchased_contacts = serializers.SerializerMethodField()
    followed_contacts = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = (
            'stats',
            'purchased_contacts',
            'followed_contacts',
            )
        
    def to_representation(self, instance):
        employer_data = super().to_representation(instance)
        employer = {
            'stats': employer_data.pop('stats'),
            'purchased_contacts': employer_data.pop('purchased_contacts'),
            'followed_contacts': employer_data.pop('followed_contacts')
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
    
    def get_purchased_contacts(self, obj):
        purchased_contacts = obj.purchasedoffers_employer.values().annotate(
            id=F('candidate__id'),
            first_name=F('candidate__first_name'),
            last_name=F('candidate__last_name'),
            phone=F('candidate__phone'),
            profession=F('candidate__profession'),
        ).values('id', 'first_name', 'last_name', 'phone', 'profession').order_by('-created_at')[:10]

        return purchased_contacts
    
    def get_followed_contacts(self, obj):
        followed_contacts = obj.favouritecandidates_employer.values().annotate(
            id=F('candidate__id'),
            first_name=F('candidate__first_name'),
            last_name=F('candidate__last_name'),
            phone=F('candidate__phone'),
            job_position=F('candidate__job_position'),
            salary_expectation=F('candidate__salary_expectation'),
            availability=F('candidate__availability'),
            province=F('candidate__province'),
            education=F('candidate__education'),
            driving_license=F('candidate__driving_license'),
            profession=F('candidate__profession'),
            has_job=F('candidate__has_job')
        ).values(
            'id', 
            'first_name', 
            'last_name',
            'profession', 
            'job_position', 
            'salary_expectation', 
            'availability',
            'province',
            'education',
            'driving_license',
            'has_job'
        ).order_by('-created_at')[:5]

        followed_contacts_array = []
        for contact in followed_contacts:
            candidate_abilities = CandidateAbilities.objects.filter(
                candidate_id=contact['id']
            ).annotate(
                category=F('ability__abilityquestions_ability__question__category__name')
            ).values('category').annotate(
                average_percentage=Avg('percentage')
            ).order_by('-average_percentage')

            abilities_dict = {}
            for ability in candidate_abilities:
                category = ability['category']
                average = round(ability['average_percentage'])
                abilities_dict[category] = average
                
            if not obj.purchasedoffers_employer.filter(candidate=contact['id']).first():
                contact['first_name'] = contact['first_name'][0] + '*' * (len(contact['first_name']) - 1)
                contact['last_name'] = contact['last_name'][0] + '*' * (len(contact['last_name']) - 1)
                
            followed_contact = {
                'id': contact['id'],
                'first_name': contact['first_name'], 
                'last_name': contact['last_name'],
                'profession': contact['profession'], 
                'job_position': contact['job_position'], 
                'salary_expectation': contact['salary_expectation'], 
                'availability': contact['availability'],
                'province': contact['province'],
                'education': contact['education'],
                'driving_license': contact['driving_license'],
                'percentage_by_category': abilities_dict,
            }
            followed_contacts_array.append(followed_contact)

        return followed_contacts_array



