export const entitySelectId = 'url';
export const entityCollectionName = 'People';
export const pluralizedEntityName = 'people';
export const entityCollectionEndPoint = pluralizedEntityName;

export interface Person {
  edited: string;
  eye_color: string;
  skin_color: string;
  species: Array<string>;
  gender: string;
  url: string;
  height: number;
  mass: number;
  films: Array<string>;
  name: string;
  starships: Array<string>;
  birth_year: string;
  created: string;
  hair_color: string;
  homeworld: string;
  vehicles: Array<string>;
}
