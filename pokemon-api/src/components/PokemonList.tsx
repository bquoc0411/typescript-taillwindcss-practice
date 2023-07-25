import React from "react";

interface Props {
  name: string;
  image: string;
}
const PokemonList: React.FC<Props> = (props) => {
  const { name, image } = props;
  return (
    <div className="mx-4 bg-yellow-50 rounded-lg hover:-translate-y-1 hover:scale-110 ease-in-out delay-100 duration-100 hover:bg-yellow-100 cursor-pointer">
      <div className="p-4">
        <img className="w-full" src={image} alt={name} loading="lazy" />
        <h3 className="font-mono text-3xl text-center">
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </h3>
      </div>
    </div>
  );
};

export default PokemonList;
