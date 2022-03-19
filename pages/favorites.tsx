import type { GetStaticProps } from "next";

import { pokeApi } from "../api";

import { NextPage, Pokemon, PokemonListResponse } from "../@interfaces";

import { Layout } from "../components/layouts";
import { NoFavorites } from "../components/ui";
import { useEffect, useState } from "react";
import localFavorites from "../utils/localFavorites";
import { Grid } from "@nextui-org/react";
import { FavoritePokemonList } from "../components/pokemon/FavoritePokemonList";

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
  return <Layout title="Pokemons - Favoritos">{page}</Layout>;
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
