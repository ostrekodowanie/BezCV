import requests
from apps.Candidates.models import Candidates, Industries
from rest_framework import serializers

from .models import Questions


class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Questions
        fields = ["id", "text"]


class CandidateCreateSerializer(serializers.ModelSerializer):
    postal_code = serializers.CharField(write_only=True)

    class Meta:
        model = Candidates
        fields = [
            "first_name",
            "last_name",
            "email",
            "phone",
            "birth_date",
            "salary_expectation",
            "availability",
            "job_position",
            "experience_sales",
            "experience_customer_service",
            "experience_office_administration",
            "education",
            "driving_license",
            "contract_type",
            "postal_code",
        ]

    def create(self, validated_data):
        postal_code = validated_data.pop("postal_code")

        # headers = {
        #     "apikey": "96352660-5eb7-11ee-9bc7-f3aa112419dc",
        # }

        # params = (("codes", postal_code), ("country", "PL"))

        # response = requests.get(
        #     "https://app.zipcodebase.com/api/v1/search",
        #     headers=headers,
        #     params=params,
        # )

        # if response.status_code == 200:
        #     location_data = response.json().get("results", {}).get(postal_code, [{}])[0]
        #     validated_data["location"] = {
        #         "postal_code": postal_code,
        #         "city": location_data["city"],
        #     }

        response = requests.get(
            f"http://kodpocztowy.intami.pl/api/{postal_code}",
        )
        if response.status_code == 200:
            location_data = response.json()[0]
            validated_data["location"] = {
                "postal_code": location_data["kod"],
                "town": location_data["miejscowosc"],
                "province": location_data["wojewodztwo"],
            }
            validated_data["province"] = location_data["wojewodztwo"]
        else:
            validated_data["location"] = {"postal_code": postal_code}

        return super().create(validated_data)


class IndustrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Industries
        fields = ["id", "name"]
