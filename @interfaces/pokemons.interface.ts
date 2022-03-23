export interface PokemonListResponse {
  count: number;
  next?: string;
  previous?: string;
  results: Pokemon[];
}

export interface Pokemon {
  id: number;
  img: string;
  name: string;
  url: string;
}
export interface DetailPokemon {
  id: number;
  name: string;
  mainImage: string;
  frontImage: string;
  backImage: string;
  frontShinyImage: string;
  backShinyImage: string;
}
