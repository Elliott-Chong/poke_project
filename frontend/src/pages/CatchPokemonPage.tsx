import React, { useEffect, useRef, useState } from "react";
import { Pokemon, PokemonCard } from "./AllPokemonsPage";
import axios from "axios";

type Props = {};

const answer = Math.ceil(Math.random() * 50);
const level = Math.ceil(Math.random() * 100);
let t: any;
const CatchPokemonPage: React.FC = (props: Props) => {
  const [pokemon, setPokemon] = useState<Pokemon>({
    attack: 0,
    defense: 0,
    hp: 0,
    id: 0,
    level: 0,
    name: "",
    owner: 0,
    type: "",
  });

  const alertRef = useRef<HTMLDivElement | null>(null);

  const [tries, setTries] = useState<number>(3);
  const [guess, setGuess] = useState<string>("");
  const [alert, setAlert] = useState<string>("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    if (isNaN(parseInt(guess))) return;

    // check if guess is larger or less than answer
    if (parseInt(guess) > answer) {
      setAlert("Too high!");
    } else if (parseInt(guess) < answer) {
      setAlert("Too low!");
    } else {
      // pokemon has been caught
      catchPokemon(pokemon);
      window.alert(pokemon.name + " of " + level + " level has been caught!");
    }

    setTries((tries) => tries - 1);
    setGuess("");
  };

  const catchPokemon = async (pokemon: Pokemon) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify({ pokemon_id: pokemon.id, level });
      await axios.post("/pokemon/addpokemon", body, config);
      window.location.href = "/pokemons/owned";
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (alert !== "") {
      // clear alert message
      clearTimeout(t);
      t = setTimeout(() => [setAlert("")], 2000);
    }
  }, [alert]);

  useEffect(() => {
    if (tries === 0) {
      window.alert(pokemon.name + " has ran away!");
      window.location.href = "/pokemons/catch";
    }
  }, [tries, pokemon.name]);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get("pokemon/availablepokemon");
        let available_pokemons = response.data;
        // choose one random pokemon from the list of available pokemons
        setPokemon(
          available_pokemons[
            Math.floor(Math.random() * available_pokemons.length)
          ]
        );
      } catch (error) {
        console.error(error);
      }
    };
    fetchPokemon();
  }, []);

  return (
    <div className="p-12 text-white font-poppins">
      <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
        <div className="flex flex-col justify-center items-center gap-4">
          <h1 className="text-xl">
            A wild <span className="font-bold">{pokemon.name}</span> has
            appeared!
          </h1>
          <PokemonCard pokemon={pokemon} className="w-fit" />
          <input
            type="text"
            name="guess"
            id="guess"
            value={guess}
            onKeyDown={handleKeyDown}
            onChange={(e) => setGuess(e.target.value)}
            className="input w-[70%] text-center"
            placeholder="Number from 1 - 50"
          />
          <p>Guess the number to catch it!</p>
          <p>
            You have <span className="font-bold">{tries}</span> tries left.
          </p>
          <div
            ref={alertRef}
            className={`py-2 px-5 bg-red-600 rounded-lg font-bold ${
              alert === "" && "hidden"
            }`}
          >
            {alert}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatchPokemonPage;
