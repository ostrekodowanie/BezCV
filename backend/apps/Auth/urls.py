from django.urls import path

from rest_framework_simplejwt.views import TokenRefreshView

from . import views

urlpatterns = [
    path('signup', views.SignUpView.as_view()),
    path('login', views.MyTokenObtainPairView.as_view()),
    path('signup/verify', views.VerifyView.as_view()),
    path('token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path('logout', views.LogoutView.as_view()),
    path('login/reset-password', views.PasswordResetView.as_view()),
    path('login/reset-password/confirm', views.PasswordResetConfirmView.as_view()),
    path('user/<pk>', views.UserView.as_view()),
    path('user/update/<pk>', views.UpdateUserView.as_view()),
    path('profile/<pk>', views.EmployerProfileView.as_view()),
    path('profile/<pk>/followed', views.EmployerProfileFollowedView.as_view()),
    path('profile/<pk>/purchased', views.EmployerProfilePurchasedView.as_view()),
]