from django.urls import path

from . import views

urlpatterns = [
  path('survey', views.QuestionsByCategoryView.as_view()),
  path('survey/answers', views.CandidateAnswersView.as_view()),
  path('survey/candidate', views.CandidateCreateView.as_view()),
  path('survey/email', views.EmailCheckView.as_view()),
  path('survey/phone', views.SendCodeView.as_view()),
  path('survey/phone', views.SendCodeToExistingCandidate.as_view()),
  path('survey/phone/verify', views.CheckCodeView.as_view()),
]