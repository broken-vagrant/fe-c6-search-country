import { ChangeEvent, useContext, useState } from 'react';
import { CountryDispatchContext } from '../../../lib/CountryContext';
import classes from './index.module.css';

const Select = () => {

  const [value, setValue] = useState('');
  const dispatch = useContext(CountryDispatchContext)!;

  const handleRegionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value
    setValue(newValue);
    if (value !== newValue) {
      if (newValue === 'ps') {
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
    <div className={classes["field-select"]}>
      <select id="region" value={value} onChange={handleRegionChange}>
        <option value="ps">Filter by Region</option>
        <option value="Africa">Africa</option>
        <option value="Americas">Americas</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </select>
      <fieldset aria-hidden="true"></fieldset>
    </div>
  )
}

export default Select;