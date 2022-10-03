from django.urls import path
from .views import UnownedPokemonsView, MyPokemonsView, AllPokemonsView, AddPokemonView, ReleasePokemonView

urlpatterns = [
    path('unownedpokemon', UnownedPokemonsView.as_view()),
    path('mypokemon', MyPokemonsView.as_view()),
    path('allpokemon', AllPokemonsView.as_view()),
    path('addpokemon', AddPokemonView.as_view()),
    path('releasepokemon', ReleasePokemonView.as_view()),
]
