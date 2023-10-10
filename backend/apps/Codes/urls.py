from django.urls import path

from . import views

urlpatterns = [
    path("code", views.UseCodeView.as_view()),
    # path("discount/code", views.UseDiscountCodeView.as_view()),
    # path("discount", views.CheckDiscuntView.as_view()),
]
