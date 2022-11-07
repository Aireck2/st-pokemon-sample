import { FC } from "react";
import { useRouter } from "next/router";

import { Grid, Card, Text } from "@nextui-org/react";
import { zerosPrefix } from "@/helpers/functions";

interface Props {
  pokemonId: number;
}

const FavoritePokemonCard: FC<Props> = ({ pokemonId }) => {
  const router = useRouter();

  const onFavoriteClicked = () => {
    router.push(`/pokemon/${pokemonId}`);
  };

  return (
    <Grid xs={6} sm={4} md={3}>
      <Card
        isHoverable
        isPressable
        css={{ padding: 10 }}
        onClick={onFavoriteClicked}
      >
        <Card.Body css={{ p: 1 }}>
          <Card.Image
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`}
            width={"100%"}
            height={140}
          />
        </Card.Body>
        <Card.Footer>
          <Grid.Container gap={0} justify="center">
            <Grid xs={12} md={12}>
              <Text size={"small"} color="#aaa">{`N.º ${zerosPrefix(
                Number(pokemonId)
              )}`}</Text>
            </Grid>
          </Grid.Container>
        </Card.Footer>
      </Card>
    </Grid>
  );
};

export default FavoritePokemonCard;
