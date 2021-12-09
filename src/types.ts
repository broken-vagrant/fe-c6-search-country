export interface Country {
  capital: string[],
  cioc: string,
  cca3: string,
  flags: {
    png: string;
    svg: string;
  }
  region: string;
  subregion: string;
  population: number;
  name: {
    common: string
  };
  languages: {
    [key: string]: string
  };
  tld: string[];
  borders: string[];
}

export type IHomePageAction = {
  type: 'new-search',
  data?: Country[],
  error?: string
} | {
  type: 'region-change',
  region: string
}

export type IHomePageState = {
  fetched: Country[],
  filtered: Country[],
  error: string,
}