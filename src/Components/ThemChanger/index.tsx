import { useContext } from 'react';
import { FaMoon } from 'react-icons/fa';
import { ThemeContext } from '../../lib/ThemeContext';
import classes from './index.module.css';

const ThemeChanger = () => {

  const { colorMode, setColorMode } = useContext(ThemeContext)
  const isLight = colorMode === "light";

  return (
    <button className={classes['theme-changer']} onClick={() => {
      isLight ? setColorMode('dark') : setColorMode('light')
    }} aria-label="toggle theme">
      <FaMoon />Dark Mode
    </button>
  )
}

export default ThemeChanger;