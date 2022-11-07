import type { GetStaticProps } from "next";
import { useEffect, useState } from "react";

import { pokeApi } from "../api";

import { NextPage, Pokemon, PokemonListResponse } from "../models";

import { Layout } from "../components/layouts";
import { FavoritePokemonList } from "../components/pokemon";
import { NoFavorites } from "../components/ui";

import localFavorites from "../utils/localFavorites";

interface Props {
  pokemons: Pokemon[];
}

const FavoritesPage: NextPage<Props> = ({ pokemons }) => {
  const [favoritePokemons, setFavoritePokemons] = useState<number[]>([]);

  useEffect(() => {
    setFavoritePokemons(localFavorites.pokemons());
  }, []);

  return (
    <>
      {favoritePokemons.length ? (
        <FavoritePokemonList pokemons={favoritePokemons} />
      ) : (
        <NoFavorites />
      )}
    </>
  );
};

FavoritesPage.getLayout = (page) => {
  return <Layout title="Favoritos">{page}</Layout>;
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

export default FavoritesPage;
