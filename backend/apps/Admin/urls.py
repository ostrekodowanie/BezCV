from django.urls import path

from . import views

urlpatterns = [
  path('admin/candidates', views.UnverifiedCandidatesView.as_view()),
  path('admin/candidates/verify', views.VerifyCandidatesView.as_view()),
]