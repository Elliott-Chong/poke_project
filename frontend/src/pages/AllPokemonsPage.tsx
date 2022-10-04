import React, { useEffect, useState } from "react";
import axios from "axios";
import { useGlobalContext } from "../context";

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

export const PokemonCard: React.FC<{
  pokemon: Pokemon;
  className?: string;
  owned?: boolean;
}> = ({ pokemon, className, owned }) => {
  const { setAlert } = useGlobalContext();
  const [imgURL, setImgURL] = useState<string>("");
  useEffect(() => {
    if (pokemon.name.toLowerCase().includes("mime")) pokemon.name = "mr-mime";
    try {
      axios
        .get("https://pokeapi.co/api/v2/pokemon/" + pokemon.name.toLowerCase())
        .then((response) => {
          setImgURL(response.data?.sprites?.front_default);
        });
    } catch (error) {
      console.error(error);
    }
  }, [pokemon]);

  const disownPokemon = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify({ pokemon_id: pokemon.id });
      await axios.post("/pokemon/releasepokemon", body, config);
      setAlert("success", pokemon.name + " has been disowned!");
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className={
        "py-6 px-8 text-xl rounded-lg flex flex-col justify-center gap-2 items-center shadow-lg border-4 border-white " +
        className
      }
    >
      <img src={imgURL} alt="" />
      <p className="font-bold">{pokemon.name}</p>
      {owned && (
        <>
          <p>
            Attack: <span className="font-bold">{pokemon.attack}</span>
          </p>
          <p>
            Defense: <span className="font-bold">{pokemon.defense}</span>
          </p>
          <p>
            HP: <span className="font-bold">{pokemon.hp}</span>
          </p>
          <p>
            Level: <span className="font-bold">{pokemon.level}</span>
          </p>
          <p>
            Type: <span className="font-bold">{pokemon.type}</span>
          </p>
          <button
            onClick={() => {
              let disown_confirm = window.confirm(
                "Are you sure you want to disown " + pokemon.name + "?"
              );
              if (disown_confirm) {
                disownPokemon();
              }
            }}
            className="btn border-2 py-1 px-4 mt-4 border-red-600 hover:bg-red-600"
          >
            Disown
          </button>
        </>
      )}
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
    <div className="text-white font-poppins p-12 grid grid-cols-6 gap-4 place-items-center">
      {pokemons.map((pokemon) => (
        <PokemonCard pokemon={pokemon} key={pokemon.id} />
      ))}
    </div>
  );
};

export default AllPokemonsPage;
