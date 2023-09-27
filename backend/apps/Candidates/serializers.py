from django.db.models import F, Avg, Q

from rest_framework import serializers

from .models import Candidates, PurchasedOffers, CandidateAbilities, Reports
from apps.Survey.models import Abilities, Categories


class CandidateSerializer(serializers.ModelSerializer):
    ability_charts = serializers.SerializerMethodField()
    abilities = serializers.SerializerMethodField()
    worst_abilities = serializers.SerializerMethodField()
    is_purchased = serializers.SerializerMethodField()
    similar_candidates = serializers.SerializerMethodField()
    industries = serializers.SerializerMethodField()

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
            'similar_candidates',
            'industries'
        ]

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        is_purchased = self.get_is_purchased(instance)

        if not is_purchased:
            hidden_first_name = instance.first_name[0] + \
                '*' * (len(instance.first_name) - 1)
            hidden_last_name = instance.last_name[0] + \
                '*' * (len(instance.last_name) - 1)
            email_parts = instance.email.split('@')
            hidden_email = '*' * \
                (len(email_parts[0]) - 1) + '@' + '*' * (len(email_parts[1]))

            representation['first_name'] = hidden_first_name
            representation['last_name'] = hidden_last_name
            representation['email'] = hidden_email
            representation['phone'] = '*********'

        return representation

    def get_ability_charts(self, obj):
        if obj.completed_surveys:
            abilities = obj.candidateabilities_candidate.annotate(
                category=F(
                    'ability__abilityquestions_ability__question__category__name')
            ).values('category').annotate(average_percentage=Avg('percentage')).order_by('-average_percentage')

            abilities_dict = {}
            for ability in abilities:
                category = ability['category']
                average = round(ability['average_percentage'])
                abilities_dict[category] = average

            return abilities_dict
        else:
            return None

    def get_abilities_helper(self, obj, filter_condition):
        if obj.completed_surveys:
            all_categories = Abilities.objects.values_list(
                'abilityquestions_ability__question__category__name', flat=True
            ).distinct()

            abilities_dict = {category: [] for category in all_categories}

            abilities = obj.candidateabilities_candidate.annotate(
                name=F('ability__name'),
                category=F(
                    'ability__abilityquestions_ability__question__category__name')
            ).values('name', 'percentage', 'category').filter(filter_condition).distinct()

            for ability in abilities:
                category = ability['category']
                abilities_dict[category].append({
                    'name': ability['name'],
                    'percentage': ability['percentage']
                })

            for category, abilities_list in abilities_dict.items():
                abilities_list.sort(
                    key=lambda x: x['percentage'], reverse=True)
                abilities_dict[category] = abilities_list

            return abilities_dict
        else:
            return None

    def get_abilities(self, obj):
        if obj.completed_surveys:
            worst_abilities = self.get_worst_abilities(obj)
            worst_abilities_names = [
                ability['name'] for category in worst_abilities.values() for ability in category]

            abilities = self.get_abilities_helper(obj, Q(percentage__gte=20))

            all_abilities = Abilities.objects.annotate(
                category=F(
                    'abilityquestions_ability__question__category__name')
            ).values('name', 'category').distinct()

            new_abilities = all_abilities.exclude(
                name__in=[ability['name'] for category in abilities.values()
                          for ability in category] + worst_abilities_names
            )

            for ability in new_abilities:
                category = ability['category']
                if category not in abilities:
                    abilities[category] = []
                abilities[category].append({
                    'name': ability['name'],
                    'percentage': None
                })

            return abilities
        else:
            return None

    def get_worst_abilities(self, obj):
        return self.get_abilities_helper(obj, Q(percentage__lt=20))

    def get_is_purchased(self, obj):
        user = self.context['request'].user
        if user.is_authenticated:
            purchased_offers = obj.purchasedoffers_candidate.filter(
                employer=user)
            if purchased_offers.exists():
                return True
        return False

    def get_similar_candidates(self, obj):
        similar_candidates = Candidates.objects.filter(profession=obj.profession).exclude(id=obj.id).values(
            "id",
            "first_name",
            "last_name",
            "phone",
            "profession",
            "job_position",
            "salary_expectation",
            "availability",
            "province",
            "education",
            "driving_license",
            "has_job",
        ).order_by('-created_at').distinct()[:5]

        for candidate in similar_candidates:
            user = self.context['request'].user

            candidate_obj = Candidates.objects.get(id=candidate['id'])
            industries = candidate_obj.candidateindustries_candidate.values_list(
                'industry__name', flat=True)[:3]
            candidate['industries'] = list(industries)

            if not user.purchasedoffers_employer.filter(candidate=candidate['id']).first():
                candidate['first_name'] = candidate['first_name'][0] + \
                    '*' * (len(candidate['first_name']) - 1)
                candidate['last_name'] = candidate['last_name'][0] + \
                    '*' * (len(candidate['last_name']) - 1)
                candidate['phone'] = '*********'

        return similar_candidates

    def get_industries(self, obj):
        industries = obj.candidateindustries_candidate.values_list(
            'industry__name', flat=True)
        return list(industries)


class CandidatesSerializer(serializers.ModelSerializer):
    is_followed = serializers.SerializerMethodField()
    industries = serializers.SerializerMethodField()

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
            'is_followed',
            'industries'
        ]

    def to_representation(self, instance):
        representation = super().to_representation(instance)

        purchased_offers = instance.purchasedoffers_candidate.filter(
            employer=self.context['request'].user)

        if not purchased_offers.exists():
            hidden_first_name = instance.first_name[0] + \
                '*' * (len(instance.first_name) - 1)
            hidden_last_name = instance.last_name[0] + \
                '*' * (len(instance.last_name) - 1)

            representation['first_name'] = hidden_first_name
            representation['last_name'] = hidden_last_name
            representation['phone'] = '*********'
        return representation

    def get_is_followed(self, obj):
        user = self.context['request'].user
        if user.is_authenticated:
            followed_offers = obj.favouritecandidates_candidate.filter(
                employer=user)
            if followed_offers.exists():
                return True
        return False

    def get_industries(self, obj):
        industries = obj.candidateindustries_candidate.values_list(
            'industry__name', flat=True)[:3]
        return list(industries)


class PurchaseOfferSerializer(serializers.ModelSerializer):
    class Meta:
        model = PurchasedOffers
        fields = '__all__'


class PurchasedOffersSerializer(serializers.ModelSerializer):
    abilities = serializers.SerializerMethodField()

    class Meta:
        model = Candidates
        fields = ('id', 'first_name', 'last_name',
                  'preferred_profession', 'abilities')

    def get_abilities(self, obj):
        abilities = obj.candidateabilities_candidate.annotate(
            name=F('ability__name'),
            category=F(
                'ability__abilityquestions_ability__question__category__name')
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
