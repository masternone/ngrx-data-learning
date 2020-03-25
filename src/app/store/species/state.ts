export const entitySelectId = 'url';
export const entityCollectionName = 'Species';
export const pluralizedEntityName = 'species';
export const entityCollectionEndPoint = pluralizedEntityName;

export interface Species {
  name: string;
  classification: string;
  designation: string;
  average_height: number;
  skin_colors: Array<string>;
  hair_colors: Array<string>;
  eye_colors: Array<string>;
  average_lifespan: number;
  homeworld: string;
  language: string;
  people: Array<string>;
  films: Array<string>;
  created: string;
  edited: string;
  url: string;
}
