import Cards from "../../Components/Cards";
import SearchInput from "../../Components/Form/SearchInput";
import Select from "../../Components/Form/Select";
import classes from './index.module.css';

const Home = () => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.controls}>
        <SearchInput />
        <Select />
      </div>
      <Cards />
    </div>
  )
}

export default Home;