from django.db.models import F, Avg

from rest_framework import serializers

from .models import Candidates, PurchasedOffers, CandidateAbilities


class CandidateSerializer(serializers.ModelSerializer):
    ability_charts = serializers.SerializerMethodField()
    abilities = serializers.SerializerMethodField()
    worst_abilities = serializers.SerializerMethodField()
    is_purchased = serializers.SerializerMethodField()
    similar_candidates = serializers.SerializerMethodField()
    class Meta:
        model = Candidates
        fields = [
            'similar_candidates',
            'is_purchased',
            'first_name', 
            'last_name', 
            'email', 
            'phone', 
            'salary_expectation', 
            'availability', 
            'job_position',
            'education',
            'driving_license',
            'desc',
            'ability_charts',
            'abilities',
            'worst_abilities'
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

        main_candidate_abilities_dict = {}
        for ability in main_candidate_abilities:
            category = ability['category']
            average = round(ability['average_percentage'])
            main_candidate_abilities_dict[category] = average

        all_candidate_abilities = CandidateAbilities.objects.values(
            'ability__abilityquestions_ability__question__category__name'
        ).annotate(average_percentage=Avg('percentage'))

        all_candidate_abilities_dict = {}
        for ability in all_candidate_abilities:
            print(ability)
            category = ability['ability__abilityquestions_ability__question__category__name']
            average = round(ability['average_percentage'])
            all_candidate_abilities_dict[category] = average

        better_than = {}
        for category in main_candidate_abilities_dict:
            main_candidate_percentage = main_candidate_abilities_dict[category]
            all_candidate_percentage = all_candidate_abilities_dict.get(category, 0)
            percentage_difference = main_candidate_percentage - all_candidate_percentage
            better_than[category] = percentage_difference

        return better_than

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
            abilities_dict[category].append({
                'name': ability['name'],
                'percentage': ability['percentage']
            })

        '''for category, category_abilities in abilities_dict.items():
            category_abilities.sort(key=lambda x: x['percentage'], reverse=True)
            abilities_dict[category] = {
                'best': category_abilities[:6],
                'worst': category_abilities[-2:]
            }'''

        for category, abilities_list in abilities_dict.items():
            abilities_list.sort(key=lambda x: x['percentage'], reverse=True)
            abilities_dict[category] = abilities_list[:6]

        return abilities_dict
    
    def get_worst_abilities(self, obj):
        abilities = obj.candidateabilities_candidate.annotate(
            name=F('ability__name')
        ).values('name', 'percentage').order_by('percentage').distinct()[:6]

        abilities_array = []
        for ability in abilities:
            if ability['percentage'] < 40:
                abilities_array.append({
                    'name': ability['name'],
                    'percentage': ability['percentage']
                })

        return abilities_array
    
    def get_is_purchased(self, obj):
        user = self.context['request'].user
        if user.is_authenticated:
            purchased_offers = obj.purchasedoffers_candidate.filter(employer=user)
            if purchased_offers.exists():
                return True
        return False
    
    def get_similar_candidates(self, obj):
        similar_candidates = Candidates.objects.filter(preferred_profession=obj.preferred_profession).exclude(id=obj.id).order_by('-created_at').distinct()[:5]
        return similar_candidates.values()
    

class CandidatesSerializer(serializers.ModelSerializer):
    percentage_by_category = serializers.SerializerMethodField()
    is_followed = serializers.SerializerMethodField()

    class Meta:
        model = Candidates
        fields = [
            'created_at',
            'id',
            'first_name', 
            'last_name',
            'phone',
            'birth_date',
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

    def create(self, validated_data):
        instance = PurchasedOffers.objects.create(**validated_data)
        instance.employer.reduce_points()

        return instance


class PurchasedOffersSerializer(serializers.ModelSerializer):
    professions = serializers.SerializerMethodField()
    abilities = serializers.SerializerMethodField()
    class Meta:
        model = Candidates
        fields = ('id', 'first_name', 'last_name', 'professions', 'abilities')

    def get_professions(self, obj):
        return [profession.profession.name for profession in obj.candidateprofessions_candidate.all()]

    def get_abilities(self, obj):
        abilities = sorted([{'name': ability.ability.name, 'percentage': ability.percentage} for ability in obj.candidateabilities_candidate.all()],
                    key=lambda x: x['percentage'], reverse=True)[:3]
        return [ability['name'] for ability in abilities]