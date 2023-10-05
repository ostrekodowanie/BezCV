import datetime
import random
import string

import openai
from apps.Candidates.models import CandidateIndustries, Candidates, Industries
from config.settings import client
from django.core.mail import EmailMessage, send_mail
from django.db.models import F
from django.template.loader import render_to_string
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import CandidateAnswers, Categories, Questions, VerifyCodes
from .serializers import (
    CandidateCreateSerializer,
    IndustrySerializer,
    QuestionSerializer,
)
from .signals import update_percentage


class QuestionsByCategoryView(generics.ListAPIView):
    serializer_class = QuestionSerializer

    def get_queryset(self):
        category = self.request.GET.get("c")
        phone = self.request.GET.get("phone")
        answered_questions = Questions.objects.filter(
            candidateanswers_question__candidate__phone=phone
        ).values_list("id", flat=True)
        return (
            Questions.objects.exclude(id__in=answered_questions)
            .filter(category__name=category)
            .order_by("?")
        )


class CandidateAnswersView(APIView):
    def post(self, request, format=None):
        candidate_phone = request.data.get("candidate")
        answers = request.data.get("answers")
        profession = request.data.get("profession")
        industry_ids = request.data.get("industries", [])

        candidate = Candidates.objects.get(phone=candidate_phone)
        if candidate.profession is None:
            candidate.profession = profession

        for industry_id in industry_ids:
            try:
                industry = Industries.objects.get(id=industry_id)
                CandidateIndustries.objects.create(
                    candidate=candidate, industry=industry
                )
            except Industries.DoesNotExist:
                pass

        candidate_answers = [
            CandidateAnswers(
                question=Questions.objects.get(pk=question),
                answer=answer,
                candidate=candidate,
            )
            for question, answer in answers
        ]
        CandidateAnswers.objects.bulk_create(candidate_answers)

        for answer in candidate_answers:
            update_percentage(None, instance=answer)

        abilities = (
            candidate.candidateabilities_candidate.annotate(name=F("ability__name"))
            .values("name", "percentage")
            .order_by("-percentage")
            .distinct()[:3]
        )

        total_experience_months = (
            candidate.experience_customer_service
            + candidate.experience_office_administration
            + candidate.experience_sales
        )

        if total_experience_months > 0:
            positions = {
                "obsługi klienta": candidate.experience_customer_service,
                "administracji biurowej": candidate.experience_office_administration,
                "sprzedaży": candidate.experience_sales,
            }
            best_position = max(positions, key=positions.get)
            years_of_experience = positions[best_position] // 12
            months_of_experience = positions[best_position] % 12

            experience_text = f"z {str(years_of_experience) + ' letnim' if years_of_experience > 0 else str(months_of_experience) + ' miesięcznym'} doświadczeniem na stanowisku {best_position}"
        else:
            experience_text = "bez doświadczenia"

        input_text = f"""
            Nie powtarzaj słów kluczowych.
            Nie wyliczaj.
            Nie pisz długimi zdaniami.
            Napisz korzyści, jakie może przynieść zatrudnienie pracownika {experience_text}.
            Tego pracownika wyróżniają trzy najważniejsze kompetencje miękkie, takie jak {abilities[0]['name']}, {abilities[1]['name']} oraz {abilities[2]['name']}. 
            Skoreluj je ze sobą. 
            Bez pisania wprost o umiejętnościach. 
            Poprzednie stanowisko kandydata to {candidate.job_position}.
        """
        try:
            response = openai.Completion.create(
                engine="text-davinci-003",
                prompt=input_text,
                max_tokens=2000,
                n=1,
                stop=None,
                temperature=0.3,
            )

            description = response.choices[0].text.strip()
            candidate.desc = description
        except Exception as e:
            send_mail(
                subject=f"{candidate.id} - OpenAI",
                message=f"{e}",
                from_email="biuro@bezcv.com",
                to=["biuro@bezcv.com"],
                fail_silently=False,
            )

        if candidate.completed_surveys:
            candidate.completed_surveys.append(profession)
        else:
            candidate.completed_surveys = []
            candidate.completed_surveys.append(profession)

        candidate.save()

        if candidate.completed_surveys:
            if len(candidate.completed_surveys) == 1:
                context = {"candidate": candidate}

                message = render_to_string("candidates/survey.html", context)
                email_message = EmailMessage(
                    subject="Zwiększ swoją szansę na wymarzoną pracę - bezCV",
                    body=message,
                    to=[candidate.email],
                )
                email_message.content_subtype = "html"
                email_message.send()

            if len(candidate.completed_surveys) == 3:
                sales = office_administration = customer_service = []

                abilities = (
                    candidate.candidateabilities_candidate.annotate(
                        name=F("ability__name"),
                        category=F(
                            "ability__abilityquestions_ability__question__category__name"
                        ),
                    )
                    .values("name", "percentage", "category")
                    .order_by("-percentage")
                    .distinct()
                )

                for ability in abilities:
                    category = ability["category"]
                    if category == "sales":
                        sales.append(
                            {
                                "name": ability["name"],
                                "percentage": ability["percentage"],
                            }
                        )
                    elif category == "office_administration":
                        office_administration.append(
                            {
                                "name": ability["name"],
                                "percentage": ability["percentage"],
                            }
                        )
                    elif category == "customer_service":
                        customer_service.append(
                            {
                                "name": ability["name"],
                                "percentage": ability["percentage"],
                            }
                        )

                context = {
                    "candidate": candidate,
                    "sales": sales,
                    "office_administration": office_administration,
                    "customer_service": customer_service,
                }

                message = render_to_string("candidates/all_surveys.html", context)
                email_message = EmailMessage(
                    subject="Zobacz swoje kompetencje miękkie - bezCV",
                    body=message,
                    to=[candidate.email],
                )
                email_message.content_subtype = "html"
                email_message.send()

        return Response({"first_name": candidate.first_name})


class CandidateCreateView(generics.CreateAPIView):
    queryset = Candidates.objects.all()
    serializer_class = CandidateCreateSerializer


class EmailCheckView(APIView):
    def post(self, request):
        email = request.data.get("email")
        if Candidates.objects.filter(email=email).exists():
            return Response({"Email already exists."}, status=status.HTTP_200_OK)
        return Response(status=204)


class SendCodeView(APIView):
    def post(self, request):
        phone = request.data.get("phone")
        gen_code = VerifyCodes.objects.filter(phone=phone)

        code = "".join(random.choices(string.digits, k=6))

        if gen_code:
            gen_code.delete()

        VerifyCodes.objects.create(phone=phone, code=code)

        client.sms.send(
            to=phone,
            message=f"Twój kod weryfikacyjny bezCV to: {code}",
            from_="bezCV",
            encoding="utf-8",
        )

        return Response({"Access code sent successfully"}, status=200)


class SendCodeToExistingCandidate(APIView):
    def post(self, request):
        phone = request.data.get("phone")

        if not Candidates.objects.filter(phone=phone).exists():
            return Response({"Nie znaleźliśmy takiego numeru w bazie"}, status=400)

        gen_code = VerifyCodes.objects.filter(phone=phone)

        code = "".join(random.choices(string.digits, k=6))

        if gen_code:
            gen_code.delete()

        VerifyCodes.objects.create(phone=phone, code=code)

        client.sms.send(
            to=phone,
            message=f"Twój kod weryfikacyjny bezCV to: {code}",
            from_="bezCV",
            encoding="utf-8",
        )

        return Response(status=200)


class CheckCodeView(APIView):
    def post(self, request):
        phone = request.data.get("phone")
        code = request.data.get("code")
        if Candidates.objects.filter(phone=phone).exists():
            try:
                gen_code = VerifyCodes.objects.get(phone=phone, code=code)
            except VerifyCodes.DoesNotExist:
                return Response({"Access code is not valid"}, status=400)

            candidate = Candidates.objects.get(phone=phone)

            if (
                datetime.datetime.now(datetime.timezone.utc) - gen_code.created_at
            ).total_seconds() <= 600:
                candidate = Candidates.objects.get(phone=phone)
                gen_code.delete()
                return Response(candidate.completed_surveys, status=200)
            else:
                gen_code.delete()
                return Response({"Access code expired"}, status=400)
        else:
            return Response(status=204)


class IndustryListView(generics.ListAPIView):
    serializer_class = IndustrySerializer

    def get_queryset(self):
        profession = self.request.GET.get("profession")
        return Industries.objects.filter(profession=profession)
