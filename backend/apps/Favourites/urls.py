from django.urls import path

from . import views

urlpatterns = [
  path('profile/favourites', views.FavouriteOffersView.as_view()),
  path('profile/favourites/add', views.AddToFavouritesView.as_view()),
  path('profile/favourites/remove/<u>/<c>', views.RemoveFromFavouritesView.as_view()),
]