import { ReactElement, ReactNode } from "react";
import type { GetStaticProps, NextPage } from "next";

import { pokeApi } from "../api";
import { Layout, PokemonList } from "../components";
import { Pokemon, PokemonListResponse } from "../interfaces";

interface IHomePage {
  getLayout?: (page: ReactElement) => ReactNode;
}

interface Props {
  pokemons: Pokemon[];
}
const HomePage: NextPage<Props> & IHomePage = ({ pokemons }) => {
  return (
    <div className="">
      {/* <Button color={"gradient"}>Hola Mundo</Button> */}

      <PokemonList pokemons={pokemons}></PokemonList>
    </div>
  );
};

HomePage.getLayout = (page) => {
  return <Layout title="Listado de Pokemons">{page}</Layout>;
};

export const getStaticProps: GetStaticProps = async (ctx) => {
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
