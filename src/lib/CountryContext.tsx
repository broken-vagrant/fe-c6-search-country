import { createContext, Dispatch, ReactNode, useCallback, useEffect, useReducer } from "react";
import { Country } from "../types";

export type ICountryAction = {
  type: 'init',
  data?: Country[],
  error?: string
} | {
  type: 'new-search',
  searchKey: string,
  data?: Country[],
  error?: string
} | {
  type: 'empty-search'
} | {
  type: 'region-filter',
  region: string
} | {
  type: "no-filter"
} | {
  type: 'new-fetch',
  data: Country[]
}

export type ICountryState = {
  searchKey: string,
  init: Country[],
  fetched: Country[],
  filtered: Country[],
  error: string,
}

const initialState = {
  searchKey: '',
  fetched: [],
  init: [],
  filtered: [],
  error: '',
}

export const CountryContext = createContext<ICountryState>(initialState);

export const CountryDispatchContext = createContext<Dispatch<ICountryAction> | null>(null);

const defaultCountries = ['ger', 'usa', 'ind', 'can', 'mex', 'npl', 'chn', 'mar', 'prt', 'and'];


function countryReducer(state: ICountryState, action: ICountryAction) {
  switch (action.type) {
    case 'init':
      if (action.error) {
        return { ...state, error: action.error }
      }
      if (action.data) {
        return { ...state, init: action.data, fetched: action.data, filtered: action.data }
      }
      return state;
    case 'new-search':
      if (action.error) {
        return { ...state, error: action.error }
      }
      if (action.data) {
        return { ...state, searchKey: action.searchKey, fetched: action.data, filtered: action.data }
      }
      return state;
    case 'empty-search':
      if (state.searchKey) {
        return {
          ...state, searchKey: '', filtered: state.init, fetched: state.init
        }
      }
      return state;
    case 'new-fetch':
      state.init.concat(action.data); // intentionally mutate data, avoid render, just to save data and additional network requests
      if (state.init.length > 10) {
        state.init.splice(0, state.init.length - 10);
      }
      return state;
    case 'region-filter':
      const filteredCountries = state.fetched.filter((country) => country.region === action.region);
      return {
        ...state, filtered: filteredCountries
      }
    case 'no-filter':
      if (!state.searchKey) {
        return {
          ...state, filtered: state.init, fetched: state.init
        }
      }
      return {
        ...state, filtered: state.fetched
      }
    default:
      return state;
  }
}
export const CountryProvider = ({ children }: { children: ReactNode }) => {

  const [state, dispatch] = useReducer(countryReducer, initialState);

  const fetchInfo = useCallback(async function () {
    const response = await fetch(`https://restcountries.com/v3.1/alpha?codes=${defaultCountries.join(',')}`)
    if (response.status === 200) {
      const data = await response.json();
      dispatch({
        type: "init",
        data: data
      })
    }
    else {
      dispatch({
        type: 'init',
        error: response.statusText
      })
    }
  }, [])

  const refresh = useCallback(async () => {
    if (state.init.length === 0) {
      await fetchInfo();
    }
    else {
      console.log('cache already uptodate!')
    }
  }, [])


  useEffect(() => {
    fetchInfo()
  }, []);
  return (
    <CountryContext.Provider value={state}>
      <CountryDispatchContext.Provider value={dispatch}>
        {children}
      </CountryDispatchContext.Provider>
    </CountryContext.Provider>
  )
}