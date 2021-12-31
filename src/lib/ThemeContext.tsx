import React, { useState, useEffect, createContext } from "react";
import { COLOR_MODE_KEY, INITIAL_COLOR_MODE_CSS_PROP, THEME_VARS } from "@/constants/";

type ThemeProps = {
  colorMode: string;
  setColorMode: (newValue: "light" | "dark") => void;
};

export const ThemeContext = createContext<ThemeProps>({} as ThemeProps);

export const ThemeProvider = ({ children }: any) => {
  const [colorMode, rawSetColorMode] = useState("");
  useEffect(() => {
    const root = window.document.documentElement;
    const initalColorMode = root.style.getPropertyValue(INITIAL_COLOR_MODE_CSS_PROP);
    rawSetColorMode(initalColorMode);
  }, []);

  const contextValue = React.useMemo(() => {
    function setColorMode(newValue: "light" | "dark") {
      const root = window.document.documentElement;

      // 1. Update React color-mode state
      rawSetColorMode(newValue);

      // 2. Update localStorage
      localStorage.setItem(COLOR_MODE_KEY, newValue);

      // 3. Update each theme variable
      Object.entries(THEME_VARS).forEach(([name, valueByTheme]) => {
        const cssVarName = `--${name}`;

        root.style.setProperty(cssVarName, valueByTheme[newValue]);
      })
    }
    return {
      colorMode,
      setColorMode,
    };
  }, [colorMode, rawSetColorMode]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};