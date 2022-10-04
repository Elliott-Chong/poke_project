import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pokemon, PokemonCard } from "./AllPokemonsPage";
import { Link } from "react-router-dom";

type Props = {};

const OwnedPokemons = (props: Props) => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await axios.get("/pokemon/mypokemon");
        setPokemons(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPokemons();
  }, []);

  return (
    <div className="p-12 text-white font-poppins font-bold">
      <h1 className="mb-4 text-3xl">Owned Pokemons</h1>
      <div className="grid grid-cols-6 gap-4">
        {pokemons.map((pokemon) => (
          <PokemonCard pokemon={pokemon} key={pokemon.id} />
        ))}
      </div>
      {pokemons.length === 0 && (
        <>
          <p>You do not own any pokemons!</p>
          <Link className="underline" to="/pokemons/catch">
            Catch some here!
          </Link>
        </>
      )}
    </div>
  );
};

export default OwnedPokemons;
