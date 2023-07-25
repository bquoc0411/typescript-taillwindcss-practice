import React from "react";
import { Pokemon } from "../interface";
import PokemonList from "./PokemonList";

interface Props {
  pokemons: Pokemon[];
}

const PokemonCollection: React.FC<Props> = (props) => {
  const { pokemons } = props;
  console.log(pokemons);
  return (
    <>
      {pokemons.map((item) => {
        return (
            <PokemonList
              key={item.id}
              name={item.name}
              image={item.sprites.front_default}
            />
        );
      })}
    </>
  );
};

export default PokemonCollection;
