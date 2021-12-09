import { useEffect, useReducer } from "react";
import Card from "../../Components/Card";
import SearchInput from "../../Components/Form/SearchInput";
import Select from "../../Components/Form/Select/Select";
import Layout from "../../Components/Layout";
import { IHomePageAction, IHomePageState } from "../../types";
import classes from './index.module.css';

const defaultCountries = ['ger', 'usa', 'ind', 'can', 'mex', 'npl', 'chn', 'mar', 'prt', 'and'];

const initialState = {
  fetched: [],
  filtered: [],
  error: '',
}

function homeReducer(state: IHomePageState, action: IHomePageAction) {
  switch (action.type) {
    case 'new-search':
      if (action.error) {
        return { ...state, error: action.error }
      }
      if (action.data) {
        return { ...state, fetched: action.data, filtered: action.data }
      }
      else {
        return state;
      }
    case 'region-change':
      const filteredCountries = state.fetched.filter((country) => country.region === action.region)
      return {
        ...state, filtered: filteredCountries
      }
    default:
      return state;
  }
}
const Home = () => {

  const [state, dispatch] = useReducer(homeReducer, initialState);

  useEffect(() => {
    async function fetchInfo() {
      const response = await fetch(`https://restcountries.com/v3.1/alpha?codes=${defaultCountries.join(',')}`)
      if (response.status === 200) {
        const data = await response.json();
        dispatch({
          type: 'new-search',
          data: data
        })
      }
      else {
        dispatch({
          type: 'new-search',
          error: response.statusText
        })
      }
    }
    fetchInfo()
  }, [])
  return (
    <Layout>
      <div className={classes.wrapper}>
        <section className={classes.controls}>
          <SearchInput dispatch={dispatch} />
          <Select dispatch={dispatch} />
        </section>
        <section className={classes.countries}>
          {
            state.filtered ? (
              state.filtered.map((item) => <Card capital={item.capital[0]} country={item.name.common} flag={item.flags.png} population={item.population} region={item.region} key={item.cioc} />)
            ) : null
          }
        </section>
      </div>
    </Layout>
  )
}

export default Home;