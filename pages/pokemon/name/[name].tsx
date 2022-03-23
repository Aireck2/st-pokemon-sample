import { useState } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { Button, Card, Container, Grid, Image, Text } from "@nextui-org/react";
import confetti from "canvas-confetti";

import {
  DetailPokemon,
  NextPage,
  PokemonListResponse,
} from "../../../@interfaces";
import { pokeApi } from "../../../api";

import { Layout } from "../../../components/layouts";

import { getFormatPokemon } from "../../../helpers/format.helper";
import localFavorites from "../../../utils/localFavorites";

interface Props {
  pokemon: DetailPokemon;
}

const PokemonByNamePage: NextPage<Props> = ({ pokemon }) => {
  const [isInFavorite, setIsInFavorite] = useState(
    localFavorites.existInFavorites(pokemon.id)
  );
  const handleFavorite = () => {
    localFavorites.toggleFavorite(pokemon.id);
    setIsInFavorite(!isInFavorite);

    if (isInFavorite) return;

    confetti({
      zIndex: 999,
      particleCount: 100,
      spread: 160,
      angle: -100,
      origin: {
        x: 1,
        y: 0,
      },
    });
  };

  return (
    <>
      <Grid.Container css={{ marginTop: 5 }} gap={2}>
        <Grid sm={6}>
          <Card hoverable css={{ padding: 30 }}>
            <Card.Body>
              <Card.Image
                src={pokemon.mainImage}
                alt={pokemon.name}
                width="100%"
                height={200}
              ></Card.Image>
            </Card.Body>
          </Card>
        </Grid>
        <Grid sm={6}>
          <Card css={{ padding: 30 }}>
            <Card.Header
              css={{ display: "flex", justifyContent: "space-between" }}
            >
              <Text h1 transform="capitalize">
                {pokemon.name}
              </Text>
              <Button
                color={"gradient"}
                ghost={!isInFavorite}
                onClick={handleFavorite}
              >
                {isInFavorite ? "Quitar de favoritors" : "Guardar en favoritos"}
              </Button>
            </Card.Header>
            <Card.Body>
              <Text size={30}>Sprites:</Text>
              <Container direction="row" display="flex" gap={0}>
                <Image
                  src={pokemon.frontImage}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.backImage}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.frontShinyImage}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.backShinyImage}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
              </Container>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </>
  );
};

PokemonByNamePage.getLayout = (page) => {
  const pokemon = page.props.children.props.pokemon;
  return <Layout title={pokemon.name}>{page}</Layout>;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await pokeApi.get<PokemonListResponse>("pokemon/?limit=151");

  const pokemon151 = data?.results?.map(({ name }) => ({ params: { name } }));

  return {
    paths: pokemon151,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { name } = params as { name: string };

  return {
    props: { pokemon: await getFormatPokemon(name) },
  };
};

export default PokemonByNamePage;
