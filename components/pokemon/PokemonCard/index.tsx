import { FC } from "react";

import { Card, Grid, Text } from "@nextui-org/react";

import { Pokemon } from "@/models";
import { useRouter } from "next/router";
import { zerosPrefix } from "@/helpers/functions";

interface Props {
  pokemon: Pokemon;
}
const PokemonCard: FC<Props> = ({ pokemon }) => {
  const router = useRouter();

  const handleClick = ({ name }: Pokemon) => {
    router.push(`/pokemon/name/${name}`);
  };

  return (
    <Grid xs={6} sm={4} md={3}>
      <Card isHoverable isPressable onClick={() => handleClick(pokemon)}>
        <Card.Body css={{ p: 1 }}>
          <Card.Image
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`}
            width={"100%"}
            height={140}
          />
        </Card.Body>
        <Card.Footer>
          <Grid.Container gap={0} justify="center">
            <Grid xs={12} md={12}>
              <Text size={"small"} color="#aaa">{`N.º ${zerosPrefix(
                Number(pokemon.id)
              )}`}</Text>
            </Grid>
            <Grid xs={12} md={6} justify="center">
              <Text
                transform="capitalize"
                color="#ddd"
                size={"$sm"}
                weight="semibold"
              >
                {pokemon.name}
              </Text>
            </Grid>
          </Grid.Container>
        </Card.Footer>
      </Card>
    </Grid>
  );
};

export default PokemonCard;
