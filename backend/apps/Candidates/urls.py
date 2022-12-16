from django.urls import path

from . import views

urlpatterns = [
  path('candidate/add', views.CandidateAddView.as_view()),
  path('candidate/abilities', views.AbilitiesView.as_view()),
  path('oferty', views.OffersView.as_view()),
  path('oferty/search', views.SearchCandidateView.as_view()),
  path('oferty/purchase', views.PurchaseOfferView.as_view()),
  path('oferty/<slug>', views.CandidateView.as_view()),
]