import type { GetStaticProps } from "next";

import { pokeApi } from "../api";

import { NextPage, Pokemon, PokemonListResponse } from "../models";

import { Layout } from "../components/layouts";
import { PokemonList } from "../components/pokemon";

interface Props {
  pokemons: Pokemon[];
}

const HomePage: NextPage<Props> = ({ pokemons }) => {
  return (
    <>
      <PokemonList pokemons={pokemons} />
    </>
  );
};

HomePage.getLayout = (page) => {
  return <Layout title="Listado de Pokemons">{page}</Layout>;
};

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await pokeApi.get<PokemonListResponse>("pokemon/?limit=151");
  const pokemons: Pokemon[] = data.results.map((pokemon, index) => {
    return {
      ...pokemon,
      id: index + 1,
      img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
        index + 1
      }.png`,
    };
  });

  return {
    props: { pokemons },
  };
};

export default HomePage;
