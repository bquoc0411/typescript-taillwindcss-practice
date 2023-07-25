import React, { useEffect, useState } from "react";
import axious from "axios";
import PokemonCollection from "./components/PokemonCollection";
import { Pokemon } from "./interface";
import Headerimg from "./assets/pokemon-logo-header.svg"; // this error is ok. Don't worry

interface Pokemons { // create this interface to remove warning in where use pokemon.name
  name: string;
}

const App: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]); // Pokemon interface defined the type of value for this state
  const [nextUrl, setNextUrl] = useState<string>(""); // when call pokeAPI, it will return a res.data.next to call the next Pokemons

  useEffect(() => {
    const getPokemon = async () => {
      try {
        const res = await axious.get(
          "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0"
        );

        setNextUrl(res.data.next); //Set for the next call 
        res.data.results.forEach(async (pokemon: Pokemons) => {
          const poke = await axious.get(
            `https://pokeapi.co/api/v2/pokemon/${pokemon.name}` // Read more at PokeAPI.com
          );
          setPokemons((p) => [...p, poke.data]);
        });
      } catch (error) {
        console.error(error);
      }
    };
    getPokemon();
  }, []);

  const handleLoadMore = async () => { // Quite simmilar to the getPokemon(), take a look when setState
    try {
      const res = await axious.get(nextUrl); 
      setNextUrl(res.data.next);
      res.data.results.forEach(async (pokemon: Pokemons) => {
        const poke = await axious.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
        );
        setPokemons((p) => [...p, poke.data]);
      });
    } catch (error) {
      console.error(error);
    }
  };

  
  return (
    <>
      <div className="py-10 mb-10 flex justify-center justify-items-center">
        <img src={Headerimg} alt="" className="w-60" />
      </div>

      <div className="container mx-auto">
        <div className="grid gap-16 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-1">
          <PokemonCollection pokemons={pokemons} />
        </div>
      </div>
      <div className="m-9 flex justify-center justify-items-center">
        <button
          onClick={handleLoadMore}
          type="button"
          className="bg-violet-500 hover:bg-violet-600 focus:outline-none focus:ring focus:ring-violet-300 active:bg-violet-700 
        px-5 py-2 text-sm leading-5 rounded-full font-semibold text-white"
        >
          Load more
        </button>
      </div>
    </>
  );
};

export default App;
