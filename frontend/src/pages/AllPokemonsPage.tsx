import React, { useEffect, useState } from "react";
import axios from "axios";

type Props = {};
export interface Pokemon {
  id: number;
  level: number | null;
  name: string;
  hp: number;
  attack: number;
  defense: number;
  type: string;
  owner: number | null;
}

// const getPokemonImgURL = (pokemonIndex: number): string =>
//   `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonIndex}.png`;

export const PokemonCard: React.FC<{ pokemon: Pokemon }> = ({ pokemon }) => {
  //   const [imgURL, setImgURL] = useState<string>("");
  //   useEffect(() => {
  //     axios
  //       .get("https://pokeapi.co/api/v2/pokemon/" + pokemon.name.toLowerCase())
  //       .then((response) => {
  //         console.log(response.data.id);
  //       });
  //   }, []);
  return (
    <div className="py-3 px-6 text-xl rounded-lg shadow-lg border-2 border-white">
      {pokemon.name}
    </div>
  );
};

const AllPokemonsPage = (props: Props) => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await axios.get("/pokemon/allpokemon");
        setPokemons(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPokemons();
  }, []);

  return (
    <div className="text-white font-poppins p-12 grid grid-cols-6 gap-4">
      {pokemons.map((pokemon) => (
        <PokemonCard pokemon={pokemon} key={pokemon.id} />
      ))}
    </div>
  );
};

export default AllPokemonsPage;
