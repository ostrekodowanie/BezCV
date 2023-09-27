from django.urls import path

from . import views

urlpatterns = [
    path('candidate/filters', views.FiltersView.as_view()),
    path('oferty', views.CandidatesView.as_view()),
    path('oferty/purchase', views.PurchaseOfferView.as_view()),
    path('oferty/<pk>', views.CandidateView.as_view()),
    path('profile/candidates', views.PurchasedOffersListView.as_view()),
    path('report', views.AddReportView.as_view()),
    path('smsapi', views.smsapi_endpoint),
]
