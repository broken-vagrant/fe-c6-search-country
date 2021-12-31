import { createContext, Dispatch, ReactNode, useCallback, useContext, useEffect, useReducer } from "react";
import { Country } from "@/types";

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
} | {
  type: 'reset-to-init'
}

export type ICountryState = {
  searchKey: string,
  init: Country[],
  fetched: Country[],
  filtered: Country[],
  filteredRegion: string,
  error: string,
}

const initialState = {
  searchKey: '',
  fetched: [],
  init: [],
  filtered: [],
  filteredRegion: '',
  error: '',
}

const CountryContext = createContext<ICountryState>(initialState);

const CountryDispatchContext = createContext<Dispatch<ICountryAction> | null>(null);

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
        return { ...state, searchKey: action.searchKey, fetched: action.data, filtered: action.data, filteredRegion: 'All' }
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
      state.init.concat(action.data); // intentionally mutate data, avoid render, just to use state as storage system and save additional network requests
      if (state.init.length > 10) { // store max 10 items in initial cache holder
        state.init.splice(0, state.init.length - 10);
      }
      return state;
    case 'region-filter':
      const filteredCountries = state.fetched.filter((country) => country.region === action.region);
      return {
        ...state, filtered: filteredCountries, filteredRegion: action.region
      }
    case 'no-filter':
      if (!state.searchKey) { // no search, return to init 
        return {
          ...state, filtered: state.init, fetched: state.init, filteredRegion: 'All'
        }
      }
      return { // if searched, filter based on searched data
        ...state, filtered: state.fetched
      }
    case 'reset-to-init':
      return {
        ...state, filtered: state.init, fetched: state.init, filteredRegion: 'All', searchKey: ''
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

export const useCountryContext = () => {
  const state = useContext(CountryContext);
  if (!state) {
    throw new Error('CountryContext is not provided.')
  }
  return state;
}

export const useCountryDispatchContext = () => {
  const dispatch = useContext(CountryDispatchContext)!;
  if (!dispatch) {
    throw new Error('CountryDispatchContext is not provided.')
  }
  return dispatch;
}