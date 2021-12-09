import { Dispatch, useState, KeyboardEvent } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { IHomePageAction } from '../../../types';
import classes from './index.module.css';

const SearchInput = ({ dispatch }: { dispatch: Dispatch<IHomePageAction> }) => {
  const [search, setSearch] = useState('');
  const fetchCountry = async (name: string) => {
    const response = await fetch(`https://restcountries.com/v3.1/name/${name}`)
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
  };
  const handleSearch = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      await fetchCountry(search);
    }
  }
  return (
    <div className={classes["field-input"]}>
      <div className={classes['left-adornment']} aria-hidden="true">
        <AiOutlineSearch />
      </div>
      <input type="text" name="search" placeholder="Search for a country..." value={search} onChange={(e) => setSearch(e.target.value)} onKeyUp={handleSearch} />
      <fieldset aria-hidden="true"></fieldset>
    </div>
  )
}

export default SearchInput;