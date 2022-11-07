import { useState } from "react";
import { GetStaticPaths, GetStaticProps } from "next";

import { Button, Card, Container, Grid, Text, Image } from "@nextui-org/react";
import confetti from "canvas-confetti";

import { DetailPokemon, NextPage, PokemonFull } from "../../models";

import { Layout } from "../../components/layouts";

import { getFormatPokemon } from "../../helpers/format";
import localFavorites from "../../utils/localFavorites";

interface Props {
  pokemon: DetailPokemon;
}

const PokemonPage: NextPage<Props> = ({ pokemon }) => {
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
    <div>
      <Grid.Container css={{ marginTop: 5 }} gap={2}>
        <Grid sm={6}>
          <Card isHoverable css={{ padding: 30 }}>
            <Card.Body>
              <Card.Image
                src={pokemon?.mainImage}
                alt={pokemon.name}
                width="100%"
                height={200}
              />
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
    </div>
  );
};

PokemonPage.getLayout = (page) => {
  const pokemon = page.props.children.props.pokemon;
  return <Layout title={pokemon.name}>{page}</Layout>;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const pokemon151 = [...Array(151)].map((val, index) => `${index + 1}`);

  return {
    paths: pokemon151.map((id) => ({ params: { id } })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string };

  const pokemon = await getFormatPokemon(id);

  if (!pokemon) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { pokemon },
    revalidate: 86400, //60 * 60 * 24 = 24h
  };
};

export default PokemonPage;
