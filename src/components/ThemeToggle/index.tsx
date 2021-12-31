import { useContext } from 'react';
import { FaMoon } from 'react-icons/fa';
import { ThemeContext } from '@/lib/ThemeContext';
import classes from './index.module.css';

const ThemeToggle = () => {

  const { colorMode, setColorMode } = useContext(ThemeContext);
  const isLight = colorMode === "light";

  return (
    <button className={classes['theme-changer']} onClick={() => {
      isLight ? setColorMode('dark') : setColorMode('light')
    }} aria-label={`change theme to ${isLight ? 'dark' : 'light'} mode`}>
      <FaMoon />Dark Mode
    </button>
  )
}

export default ThemeToggle;