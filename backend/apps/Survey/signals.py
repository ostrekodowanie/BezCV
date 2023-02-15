from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from .models import CandidateAnswers, AbilityQuestions, Questions
from apps.Candidates.models import CandidateAbilities


@receiver(post_save, sender=CandidateAnswers)
def update_percentage(sender, instance, **kwargs):
    candidate = instance.candidate
    ability = instance.question.abilityquestions_question.first().ability
    print(ability)
    candidate_ability, created = CandidateAbilities.objects.get_or_create(
        candidate=candidate, ability=ability)
    if created:
        candidate_ability.percentage = 0

    question = instance.question

    ability_questions = AbilityQuestions.objects.filter(ability=ability)
    questions = Questions.objects.filter(abilityquestions_question__in=ability_questions)
    answers = CandidateAnswers.objects.filter(candidate=candidate, question__in=questions)
    total_value = 0
    for answer in answers:
        question = answer.question
        if question.abilityquestions_question.first().reverse_values:
            total_value += (6 - answer.answer)
        else:
            total_value += answer.answer
    min_value = answers.count() * 1
    max_value = answers.count() * 5

    percentage = (total_value - min_value) / (max_value - min_value) * 100
    candidate_ability.percentage = percentage
    candidate_ability.save()

@receiver(post_delete, sender=CandidateAnswers)
def update_percentage_after_delete(sender, instance, **kwargs):
    candidate = instance.candidate
    ability = instance.question.abilityquestions_question.first().ability
    try:
        candidate_ability = CandidateAbilities.objects.get(
            candidate=candidate, ability=ability)
        
        question = instance.question

        ability_questions = AbilityQuestions.objects.filter(ability=ability)
        questions = Questions.objects.filter(abilityquestions_question__in=ability_questions)
        answers = CandidateAnswers.objects.filter(candidate=candidate, question__in=questions)
        total_value = 0
        for answer in answers:
            question = answer.question
            if question.abilityquestions_question.first().reverse_values:
                total_value += (6 - answer.answer)
            else:
                total_value += answer.answer
        
        min_value = answers.count() * 1
        max_value = answers.count() * 5

        if min_value != 0:
            percentage = (total_value - min_value) / (max_value - min_value) * 100
            candidate_ability.percentage = percentage
            candidate_ability.save()
        
        candidate_ability.delete()

    except CandidateAbilities.DoesNotExist:
        pass