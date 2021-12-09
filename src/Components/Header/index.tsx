import ThemeChanger from '../ThemChanger';
import classes from './index.module.css';

const Header = () => {
  return (
    <header className={classes.header}>
      <div className={classes.container}>
        <h1>Where in the world?</h1>
        <ThemeChanger />
      </div>
    </header>
  )
}

export default Header;