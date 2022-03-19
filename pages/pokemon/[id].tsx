import { GetStaticPaths, GetStaticProps } from "next";
import { Button, Card, Container, Grid, Text, Image } from "@nextui-org/react";
import { Layout } from "../../components/layouts";
import { NextPage, PokemonFull } from "../../@interfaces";
import { pokeApi } from "../../api";
import localFavorites from "../../utils/localFavorites";
import { useState } from "react";

interface Props {
  pokemon: PokemonFull;
}

const PokemonPage: NextPage<Props> = ({ pokemon }) => {
  const [isInFavorite, setIsInFavorite] = useState(
    localFavorites.existInFavorites(pokemon.id)
  );
  const handleFavorite = () => {
    localFavorites.toggleFavorite(pokemon.id);
    setIsInFavorite(!isInFavorite);
  };

  return (
    <div>
      <Grid.Container css={{ marginTop: 5 }} gap={2}>
        <Grid sm={6}>
          <Card hoverable css={{ padding: 30 }}>
            <Card.Body>
              <Card.Image
                src={
                  pokemon.sprites.other?.dream_world.front_default ||
                  "no-image.png"
                }
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
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.front_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_shiny}
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
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string };

  const { data } = await pokeApi.get<PokemonFull>(`pokemon/${id}`);

  return {
    props: { pokemon: data },
  };
};

export default PokemonPage;
