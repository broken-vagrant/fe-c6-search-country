import Cards from "../../Components/Cards";
import SearchInput from "../../Components/Form/SearchInput";
import Select from "../../Components/Form/Select";
import Layout from "../../Components/Layout";
import classes from './index.module.css';

const Home = () => {

  return (
    <Layout>
      <div className={classes.wrapper}>
        <section className={classes.controls}>
          <SearchInput />
          <Select />
        </section>
        <Cards />
      </div>
    </Layout>
  )
}

export default Home;