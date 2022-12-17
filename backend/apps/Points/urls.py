from django.urls import path

from . import views

urlpatterns = [
  path('points/purchase', views.PurchasePointsView.as_view()),
]