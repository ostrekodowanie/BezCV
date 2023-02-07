from django.urls import path

from . import views

urlpatterns = [
  path('survey', views.QuestionsByCategoryView.as_view()),
  path('survey/answers', views.CandidateAnswersView.as_view()),
  path('survey/candidate', views.CandidateCreateView.as_view()),
  path('survey/email/<str:email>', views.EmailCheckView.as_view()),
  path('survey/phone/<str:phone>', views.PhoneCheckView.as_view()),
  path('survey/status', views.SurveyStatusView.as_view()),
]