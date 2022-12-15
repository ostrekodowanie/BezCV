from django.urls import path

from rest_framework_simplejwt.views import TokenRefreshView

from . import views

urlpatterns = [
    path('signup', views.SignUpView.as_view()),
    path('login', views.MyTokenObtainPairView.as_view()),
    path('signup/verify', views.VerifyView.as_view()),
    path('token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path('logout', views.LogoutView.as_view()),
]