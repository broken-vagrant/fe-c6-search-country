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
    nativeName: {
      [key: string]: {
        common: string
      }
    }
  };
  currencies: {
    [key: string]: {
      name: string,
      symbol: string
    }
  }
  languages: {
    [key: string]: string
  };
  tld: string[];
  borders: string[];
}
