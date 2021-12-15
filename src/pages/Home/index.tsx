import Cards from "../../Components/Cards";
import SearchInput from "../../Components/Form/SearchInput";
import Select from "../../Components/Form/Select";
import classes from './index.module.css';

const Home = () => {
  return (
    <div className={classes.wrapper}>
      <section className={classes.controls}>
        <SearchInput />
        <Select />
      </section>
      <Cards />
    </div>
  )
}

export default Home;