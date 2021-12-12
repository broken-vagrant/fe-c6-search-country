import { THEME_VARS, INITIAL_COLOR_MODE_CSS_PROP, COLOR_MODE_KEY } from '../constants/theme'

// const THEME_VARS = {
//   'clr-text': {
//     light: 'hsl(200,15%,8%)',
//     dark: 'hsl(0,0%,100%)'
//   },
//   'clr-elements': {
//     light: 'hsl(0,0%,100%)',
//     dark: 'hsl(209, 23%, 22%)'
//   },
//   'clr-input': {
//     light: 'hsl(0,0%,52%)',
//     dark: 'hsl(0, 0%, 100%)'
//   },
//   'clr-bg': {
//     light: 'hsl(0,0%,98%)',
//     dark: 'hsl(207, 26%, 17%)'
//   },
//   'shadow-color': {
//     light: '280deg 6% 76%',
//     dark: '0deg 0% 17%'
//   }
// }
(function setTheme() {
  let colorMode: 'light' | 'dark' = 'light';
  const persistedColorPreference = window.localStorage.getItem(COLOR_MODE_KEY);

  const mql = window.matchMedia("(prefers-color-scheme: dark)");
  const hasMediaQueryPreference = typeof mql.matches === "boolean";

  if (typeof persistedColorPreference == "string" && (persistedColorPreference === 'light' || persistedColorPreference === 'dark')) {
    colorMode = persistedColorPreference;
  } else {
    colorMode = hasMediaQueryPreference ? "dark" : "light";
  }

  let root = document.documentElement;

  root.style.setProperty(INITIAL_COLOR_MODE_CSS_PROP, colorMode);

  Object.entries(THEME_VARS).forEach(([name, valueByTheme]) => {
    const cssVarName = `--${name}`;
    root.style.setProperty(cssVarName, valueByTheme[colorMode])
  })
})()