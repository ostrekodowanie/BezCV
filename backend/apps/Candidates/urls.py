from django.urls import path

from . import views

urlpatterns = [
  path('candidate/add', views.CandidateAddView.as_view()),
]