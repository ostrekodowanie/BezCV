from django.urls import path

from . import views

urlpatterns = [
    path('code', views.UseCodeView.as_view()),
]