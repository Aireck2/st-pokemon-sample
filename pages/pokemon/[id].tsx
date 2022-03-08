import { Text } from "@nextui-org/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { ReactElement, ReactNode } from "react";
import { Layout } from "../../components";
import { Pokemon } from "../../interfaces";

interface IPokemonPage {
  getLayout?: (page: ReactElement) => ReactNode;
}

interface Props {
  pokemon: Pokemon;
}

const PokemonPage: NextPage<Props> & IPokemonPage = () => {
  const router = useRouter();
  console.log(router.query);
  return (
    <div>
      <Text h2>pokemon {router.query.id}</Text>
    </div>
  );
};

PokemonPage.getLayout = (page) => {
  return <Layout title={`Pokemon `}>{page}</Layout>;
};

export default PokemonPage;
