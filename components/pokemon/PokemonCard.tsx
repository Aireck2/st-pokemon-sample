import { FC } from "react";

import { Card, Grid, Row, Text } from "@nextui-org/react";

import { Pokemon } from "../../interfaces";
import { useRouter } from "next/router";

interface Props {
  pokemon: Pokemon;
}
const PokemonCard: FC<Props> = ({ pokemon }) => {
  const router = useRouter();
  const handleClick = ({ id }: Pokemon) => {
    router.push(`/pokemon/${id}`);
  };
  return (
    <Grid>
      <Card hoverable clickable onClick={() => handleClick(pokemon)}>
        <Card.Body css={{ p: 1 }}>
          <Card.Image src={pokemon.img} width="100%" height={140} />
        </Card.Body>
        <Card.Footer>
          <Row justify="space-between">
            <Text>{`#${pokemon.id} `}</Text>
            <Text transform="capitalize">{pokemon.name}</Text>
          </Row>
        </Card.Footer>
      </Card>
    </Grid>
  );
};

export default PokemonCard;