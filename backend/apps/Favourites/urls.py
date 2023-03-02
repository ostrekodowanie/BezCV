from django.urls import path

from . import views

urlpatterns = [
  path('profile/favourites/add', views.AddToFavouritesView.as_view()),
  path('profile/favourites/remove/<c>', views.RemoveFromFavouritesView.as_view()),
]