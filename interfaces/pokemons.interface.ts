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
