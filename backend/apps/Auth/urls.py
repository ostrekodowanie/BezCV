from django.urls import path

from . import views

urlpatterns = [
    path('signup', views.SignUpView.as_view()),
    path('login', views.MyTokenObtainPairView.as_view()),
    path('signup/verify', views.VerifyView.as_view()),
    path('logout', views.LogoutView.as_view()),
]