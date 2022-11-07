import React, { FC } from "react";
import { Grid } from "@nextui-org/react";

import { Pokemon } from "@/models";

import PokemonCard from "./PokemonCard";

interface Props {
  pokemons: Pokemon[];
}
const PokemonList: FC<Props> = ({ pokemons }) => {
  return (
    <Grid.Container gap={1} justify="flex-start">
      {pokemons.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </Grid.Container>
  );
};

export default PokemonList;
