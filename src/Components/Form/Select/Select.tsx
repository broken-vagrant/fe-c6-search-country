import { ChangeEvent, Dispatch, useState } from 'react';
import { IHomePageAction } from '../../../types';
import classes from './index.module.css';

const Select = ({ dispatch }: { dispatch: Dispatch<IHomePageAction> }) => {

  const [value, setValue] = useState('');

  const handleRegionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newvalue = e.target.value
    setValue(newvalue);
    if (value !== newvalue) {
      dispatch({
        type: "region-change",
        region: newvalue
      })
    }
  }
  return (
    <div className={classes["field-select"]}>
      <label htmlFor="region">
        Filter by Region
      </label>
      <select id="region" value={value} onChange={handleRegionChange}>
        <option value="Africa">Africa</option>
        <option value="Americas">Americas</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </select>
    </div>
  )
}

export default Select;