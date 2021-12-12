import Layout from "../../Components/Layout";
import classes from './index.module.css';
import { MdOutlineKeyboardBackspace } from 'react-icons/md';
import { ComponentPropsWithoutRef, useContext, useEffect, useState } from "react";
import { CountryContext, CountryDispatchContext } from "../../lib/CountryContext";
import { useParams } from "react-router";
import { Country } from "../../types";
import { Link } from "react-router-dom";

const ButtonLike = (props: ComponentPropsWithoutRef<'button'>) => (
  <button className={classes.button}>{props.children}</button>
)
const Detail = () => {

  const state = useContext(CountryContext)!;
  const dispatch = useContext(CountryDispatchContext)!;

  const [country, setCountry] = useState<Country | null>(null);
  const { code } = useParams();

  useEffect(() => {
    const fetchCountry = async (code: string) => {
      const response = await fetch(`https://restcountries.com/v3.1/alpha/${code}`)
      if (response.status === 200) {
        const data = await response.json();
        setCountry(data[0]);
        dispatch({
          type: 'new-fetch',
          data: data
        })
      }
    };

    const cacheExists = state.fetched.filter((country) => country.cioc === code);
    if (cacheExists.length !== 0) {
      setCountry(cacheExists[0]);
    } else {
      fetchCountry(code!);
    }
  }, [])

  return (
    <Layout className="detail">
      <div className={classes.wrapper}>
        <Link to="/" className={classes.button} >
          <MdOutlineKeyboardBackspace />Back
        </Link>
        {
          country && (
            <section className={classes.country}>
              <div className={classes.flag}>
                <img src={country.flags.png}></img>
              </div>
              <div className={classes.details}>
                <h2>
                  {country.name.common}
                </h2>
                <div>
                  <div className={classes.dls}>
                    <dl>
                      <div>
                        <dt>Native name</dt>
                        <dd>{country.name.nativeName[Object.keys(country.languages)[0]].common}</dd>
                      </div>
                      <div>
                        <dt>Population</dt>
                        <dd>{country.population}</dd>
                      </div>
                      <div>
                        <dt>Region</dt>
                        <dd>{country.region}</dd>
                      </div>
                      <div>
                        <dt>Sub Region</dt>
                        <dd>{country.subregion}</dd>
                      </div>
                      <div>
                        <dt>Capital</dt>
                        <dd>{country.capital}</dd>
                      </div>
                    </dl>
                    <dl>
                      <div>
                        <dt>Top Level Domain</dt>
                        <dd>{country.tld[0]}</dd>
                      </div>
                      <div>
                        <dt>Currencies</dt>
                        <dd>{country.currencies[Object.keys(country.currencies)[0]].name}</dd>
                      </div>
                      <div>
                        <dt>Languages</dt>
                        <dd>{Object.values(country.languages).join(', ')}</dd>
                      </div>
                    </dl>
                  </div>
                  <div className={classes.borders}>
                    <dl>
                      <dt>Border Countries</dt>
                      <dd>
                        {
                          country.borders.map((border) => <ButtonLike>{border}</ButtonLike>)
                        }
                      </dd>
                    </dl>
                  </div>
                </div>

              </div>
            </section>
          )
        }
      </div>
    </Layout>
  )
}

export default Detail;