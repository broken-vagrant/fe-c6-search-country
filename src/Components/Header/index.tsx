import { Link } from 'react-router-dom';
import ThemeToggle from '../ThemeToggle';
import classes from './index.module.css';

const Header = () => {
  return (
    <header className={classes.header}>
      <div className={classes.container}>
        <Link to="/">
          <h1>Where in the world?</h1>
        </Link>
        <ThemeToggle />
      </div>
    </header>
  )
}

export default Header;