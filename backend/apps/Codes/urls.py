from django.urls import path

from . import views

urlpatterns = [
    path("code", views.UseCodeView.as_view()),
    path("discounts", views.UseDiscountCodeView.as_view()),
]
