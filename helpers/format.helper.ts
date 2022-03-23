import { PokemonFull, DetailPokemon } from "../@interfaces";
import { pokeApi } from "../api";

export const getFormatPokemon = async (
  nameOrId: string
): Promise<DetailPokemon> => {
  const { data: pokemon } = await pokeApi.get<PokemonFull>(
    `pokemon/${nameOrId}`
  );

  return {
    id: pokemon?.id,
    name: pokemon?.name,
    mainImage:
      pokemon?.sprites?.other?.dream_world.front_default || "no-image.png",
    frontImage: pokemon?.sprites?.front_default,
    backImage: pokemon?.sprites?.back_default,
    frontShinyImage: pokemon?.sprites?.front_shiny,
    backShinyImage: pokemon?.sprites?.back_shiny,
  };
};
