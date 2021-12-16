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
    <div className={classes.form__field}>
      <label htmlFor="filter-by-region">Filter by Region </label>
      <div className={classes["field-select"]}>
        <select id="filter-by-region" value={value} onChange={handleRegionChange}>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
        <fieldset aria-hidden="true"></fieldset>
      </div>
    </div>
  )
}

export default Select;