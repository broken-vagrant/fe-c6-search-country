import { THEME_VARS, INITIAL_COLOR_MODE_CSS_PROP, COLOR_MODE_KEY } from '../constants/theme'

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