from django.db.models import F, Avg, Prefetch

from rest_framework import serializers

from .models import Candidates, PurchasedOffers, CandidateAbilities, Reports
from apps.Survey.models import Abilities


class CandidateSerializer(serializers.ModelSerializer):
    ability_charts = serializers.SerializerMethodField()
    abilities = serializers.SerializerMethodField()
    worst_abilities = serializers.SerializerMethodField()
    is_purchased = serializers.SerializerMethodField()
    similar_candidates = serializers.SerializerMethodField()
    class Meta:
        model = Candidates
        fields = [
            'has_job',
            'is_purchased',
            'first_name', 
            'last_name', 
            'email', 
            'phone',
            'birth_date',
            'province',
            'profession',
            'salary_expectation', 
            'availability', 
            'job_position',
            'education',
            'driving_license',
            'desc',
            'ability_charts',
            'abilities',
            'worst_abilities',
            'similar_candidates'
            ]
    
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        is_purchased = self.get_is_purchased(instance)
        if not is_purchased:
            hidden_first_name = instance.first_name[0] + '*' * (len(instance.first_name) - 1)
            hidden_last_name = instance.last_name[0] + '*' * (len(instance.last_name) - 1)
            email_parts = instance.email.split('@')
            hidden_email = email_parts[0][0] + '*' * (len(email_parts[0]) - 1) + '@' + email_parts[1]
            
            representation['first_name'] = hidden_first_name
            representation['last_name'] = hidden_last_name
            representation['email'] = hidden_email
            representation['phone'] = '*********'
            
        return representation
    
    def get_ability_charts(self, obj):                  
        main_candidate_abilities = obj.candidateabilities_candidate.annotate(
            category=F('ability__abilityquestions_ability__question__category__name')
        ).values('category').annotate(average_percentage=Avg('percentage'))
        
        total_candidate = Candidates.objects.exclude(id=obj.id).filter(is_visible=True)
        worse_candidate_counts = {}
        
        for main in main_candidate_abilities:
            worse_candidate_count = 0
            for candidate in total_candidate:
                candidate_average_percentage = candidate.candidateabilities_candidate.annotate(
                    category=F('ability__abilityquestions_ability__question__category__name')
                ).values('category').filter(category=main['category']).aggregate(
                    average_percentage=Avg('percentage')
                )['average_percentage']
                
                if candidate_average_percentage is not None and candidate_average_percentage <= main['average_percentage']:
                    worse_candidate_count += 1
             
            worse_candidate_counts[main['category']] = (worse_candidate_count / total_candidate.count()) * 100
        
        return worse_candidate_counts

    def get_abilities(self, obj):
        abilities = obj.candidateabilities_candidate.annotate(
            name=F('ability__name'),
            category=F('ability__abilityquestions_ability__question__category__name')
        ).values('name', 'percentage', 'category').distinct()

        abilities_dict = {}
        for ability in abilities:
            category = ability['category']
            if category not in abilities_dict:
                abilities_dict[category] = []
            if not ability['percentage'] < 20:
                abilities_dict[category].append({
                    'name': ability['name'],
                    'percentage': ability['percentage']
                })
                
        all_abilities = Abilities.objects.annotate(
            category=F('abilityquestions_ability__question__category__name')
        ).values('name', 'category').distinct()

        new_abilities = all_abilities.exclude(
            name__in=[ability['name'] for category in abilities_dict.values() for ability in category]
        )
        
        for category, abilities_list in abilities_dict.items():
            abilities_list.sort(key=lambda x: x['percentage'], reverse=True)
            abilities_dict[category] = abilities_list
            
        for ability in new_abilities:
            category = ability['category']
            if category not in abilities_dict:
                abilities_dict[category] = []
            abilities_dict[category].append({
                'name': ability['name'],
                'percentage': None
            })

        return abilities_dict
    
    def get_worst_abilities(self, obj):
        abilities = obj.candidateabilities_candidate.annotate(
            name=F('ability__name'),
            category=F('ability__abilityquestions_ability__question__category__name')
        ).values('name', 'percentage', 'category').distinct()

        abilities_dict = {}
        for ability in abilities:
            category = ability['category']
            if category not in abilities_dict:
                abilities_dict[category] = []
            if ability['percentage'] < 20:
                abilities_dict[category].append({
                    'name': ability['name'],
                    'percentage': ability['percentage']
                })
                
        for category, abilities_list in abilities_dict.items():
            abilities_list.sort(key=lambda x: x['percentage'], reverse=True)
            abilities_dict[category] = abilities_list

        return abilities_dict
    
    def get_is_purchased(self, obj):
        user = self.context['request'].user
        if user.is_authenticated:
            purchased_offers = obj.purchasedoffers_candidate.filter(employer=user)
            if purchased_offers.exists():
                return True
        return False
    
    
    def get_similar_candidates(self, obj):    
        similar_candidates = Candidates.objects.filter(profession=obj.profession).exclude(id=obj.id).values(
            "id",
            "first_name",
            "last_name",
            "profession",
            "job_position",
            "salary_expectation",
            "availability",
            "province",
            "education", 
            "driving_license"
        ).order_by('-created_at').distinct()[:5]
        
        
        for candidate in similar_candidates:
            abilities = CandidateAbilities.objects.filter(candidate_id=candidate['id']).annotate(
                category=F('ability__abilityquestions_ability__question__category__name')
            ).values('category').annotate(average_percentage=Avg('percentage')).order_by('-average_percentage')
            
            abilities_dict = {}
            for ability in abilities:
                category = ability['category']
                average = round(ability['average_percentage'])
                abilities_dict[category] = average
            
            candidate['percentage_by_category'] = abilities_dict
        
        return similar_candidates
    

class CandidatesSerializer(serializers.ModelSerializer):
    percentage_by_category = serializers.SerializerMethodField()
    is_followed = serializers.SerializerMethodField()

    class Meta:
        model = Candidates
        fields = [
            'has_job',
            'created_at',
            'id',
            'first_name', 
            'last_name',
            'phone',
            'province',
            'profession',
            'salary_expectation', 
            'availability', 
            'job_position',
            'education',
            'driving_license',
            'percentage_by_category',
            'is_followed'
            ]
        
    def to_representation(self, instance):
        representation = super().to_representation(instance)

        hidden_first_name = instance.first_name[0] + '*' * (len(instance.first_name) - 1)
        hidden_last_name = instance.last_name[0] + '*' * (len(instance.last_name) - 1)
        
        representation['first_name'] = hidden_first_name
        representation['last_name'] = hidden_last_name
        representation['phone'] = '*********'
        return representation
    
    def get_percentage_by_category(self, obj):
        abilities = obj.candidateabilities_candidate.annotate(
            category=F('ability__abilityquestions_ability__question__category__name')
        ).values('category').annotate(average_percentage=Avg('percentage')).order_by('-average_percentage')
        
        abilities_dict = {}
        for ability in abilities:
            category = ability['category']
            average = round(ability['average_percentage'])
            abilities_dict[category] = average

        return abilities_dict
    
    def get_is_followed(self, obj):
        user = self.context['request'].user
        if user.is_authenticated:
            followed_offers = obj.favouritecandidates_candidate.filter(employer=user)
            if followed_offers.exists():
                return True
        return False


class PurchaseOfferSerializer(serializers.ModelSerializer):
    class Meta:
        model = PurchasedOffers
        fields = '__all__'


class PurchasedOffersSerializer(serializers.ModelSerializer):
    abilities = serializers.SerializerMethodField()
    class Meta:
        model = Candidates
        fields = ('id', 'first_name', 'last_name', 'preferred_profession', 'abilities')

    def get_abilities(self, obj):    
        abilities = obj.candidateabilities_candidate.annotate(
            name=F('ability__name'),
            category=F('ability__abilityquestions_ability__question__category__name')
        ).values('name').order_by('-percentage').distinct()[:3]

        return (ability['name'] for ability in abilities)
    
    
class AddReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reports
        fields = ['candidate', 'message']
    
    def create(self, validated_data):
        user = self.context['request'].user
        
        instance = self.Meta.model.objects.create(
            candidate=validated_data['candidate'],
            message=validated_data['message'],
            employer=user
        )
        
        return instance