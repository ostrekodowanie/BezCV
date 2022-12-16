from django.urls import path

from . import views

urlpatterns = [
  path('admin/candidates', views.VerifyCandidatesView.as_view()),
]