from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from .models import Pokemon
from rest_framework import permissions
from .serializers import PokemonSerializer
from rest_framework import status


class UnownedPokemonsView(APIView):
    serializer_class = PokemonSerializer

    def get(self, request, format=None):
        user = request.user
        queryset = Pokemon.objects.exclude(owner_id=user.id)
        serializer = PokemonSerializer(queryset, many=True)
        return Response(serializer.data)


class MyPokemonsView(APIView):
    serializer_class = PokemonSerializer

    def get(self, request, format=None):
        user = request.user
        queryset = Pokemon.objects.filter(owner_id=user.id)
        serializer = PokemonSerializer(queryset, many=True)
        return Response(serializer.data)


class AllPokemonsView(ListAPIView):
    permission_classes = (permissions.AllowAny, )
    queryset = Pokemon.objects.all()
    serializer_class = PokemonSerializer


class AddPokemonView(APIView):
    serializer_class = PokemonSerializer

    def post(self, request, format=None):
        data = self.request.data
        user = request.user
        pokemon_id = data.get('pokemon_id')
        pokemon = Pokemon.objects.get(id=pokemon_id)
        if (pokemon.owner_id and pokemon.owner_id != user.id):
            return Response({'msg': 'Pokemon already belongs to someone else'}, status=status.HTTP_403_FORBIDDEN)
        elif (pokemon.owner_id and pokemon.owner_id == user.id):
            return Response({'msg': 'You already own this pokemon'}, status=status.HTTP_403_FORBIDDEN)

        pokemon.owner_id = user.id
        pokemon.save()
        return Response({'msg': "Pokemon successfully captured!"}, status=status.HTTP_200_OK)


class ReleasePokemonView(APIView):
    serializer_class = PokemonSerializer

    def post(self, request, format=None):
        user = request.user
        data = self.request.data
        pokemon_id = data.get('pokemon_id')
        pokemon = Pokemon.objects.get(id=pokemon_id)
        if (pokemon.owner_id != user.id):
            return Response({'msg': "You do not own this pokemon!"}, status=status.HTTP_403_FORBIDDEN)
        pokemon.owner_id = None
        pokemon.save()
        return Response({'msg': "Successfully disowned pokemon!"}, status=status.HTTP_200_OK)
