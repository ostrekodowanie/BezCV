from django.urls import path

from . import views

urlpatterns = [
  path('panel/favourites', views.FavouriteOffersView.as_view()),
  path('panel/favourites/add', views.AddToFavouritesView.as_view()),
  path('panel/favourites/remove/<u>/<c>', views.RemoveFromFavouritesView.as_view()),
]