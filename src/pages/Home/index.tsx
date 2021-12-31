import classes from './index.module.css';
import Cards from "@/components/Cards";
import TextField from "@/components/Form/TextField";
import Select from "@/components/Form/Select";

import { useCountryContext, useCountryDispatchContext } from '@/lib/CountryContext';
import { ChangeEvent, useEffect } from "react";
import { useState, KeyboardEvent } from 'react';
import { REGIONS } from "@/constants";

const SelectRegion = () => {

  const state = useCountryContext();
  const dispatch = useCountryDispatchContext();

  const [value, setValue] = useState(state.filteredRegion);

  useEffect(() => {
    setValue(state.filteredRegion)
  }, [state.filteredRegion])

  const handleRegionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value
    setValue(newValue);
    if (value !== newValue) {
      if (newValue === 'All') {
        dispatch({
          type: "no-filter"
        })
      }
      else {
        dispatch({
          type: "region-filter",
          region: newValue
        })
      }
    }
  }
  return (
    <Select value={state.filteredRegion || value} onChange={handleRegionChange} label="Filter By Region" options={REGIONS} />
  )
}

const SearchInput = () => {
  const [search, setSearch] = useState('');
  const [fetchStatus, setFetchStatus] = useState({ error: '', loading: false })

  const state = useCountryContext()
  const dispatch = useCountryDispatchContext();

  useEffect(() => {
    setSearch(state.searchKey);
  }, [state.searchKey])
  const fetchCountry = async (name: string) => {
    setFetchStatus({ error: '', loading: true });
    const response = await fetch(`https://restcountries.com/v3.1/name/${name}`)
    if (response.status === 200) {
      const data = await response.json();
      dispatch({
        type: 'new-search',
        searchKey: search,
        data: data
      })
      setFetchStatus({ error: '', loading: false });
    }
    else {
      dispatch({
        type: 'new-search',
        searchKey: search,
        error: response.statusText
      })
      setFetchStatus({
        error: 'Details not found',
        loading: false
      });
    }
  };
  const handleSearch = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (search) {
        await fetchCountry(search);
      }
      else {
        dispatch({
          type: 'empty-search'
        })
      }
    }
  }
  return (
    <TextField value={search} onChange={(e) => setSearch(e.target.value)} onKeyUp={handleSearch} error={fetchStatus.error} loading={fetchStatus.loading} />
  )
}

const Home = () => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.controls}>
        <SearchInput />
        <SelectRegion />
      </div>
      <Cards />
    </div>
  )
}

export default Home;