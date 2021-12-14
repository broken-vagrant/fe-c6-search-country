import { useContext } from "react";
import { CountryContext } from "../../lib/CountryContext";
import Card from "./Card";
import classes from './index.module.css';

const Cards = () => {
  const state = useContext(CountryContext)!;

  return (
    <section className={classes.countries}>
      {
        state.filtered ? (
          state.filtered.map((item) => <Card capital={item.capital && item.capital[0]} country={item.name.common} flag={item.flags.png} population={item.population} region={item.region} key={item.name.common} code={item.cioc} />)
        ) : null
      }
    </section>
  )
}

export default Cards;