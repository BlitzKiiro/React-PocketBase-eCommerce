import React, { createContext, useReducer } from "react";

type contextType = { themeMode: string; setTheme: (mode: string) => void };

export const ThemeContext = createContext<contextType | null>(null);

ThemeContext.displayName = "ThemeContext";

const storeTheme = (mode: string) => {
  localStorage.setItem("theme", mode);
};

const getStoredTheme = () => {
  return localStorage.getItem("theme");
};

const getSystemTheme = () => {
  const mql = window.matchMedia("(prefers-color-scheme: dark)");
  return mql.matches ? "dark" : "light";
};

const initialTheme = () => {
  let storedTheme = getStoredTheme();
  if (storedTheme) {
    return storedTheme;
  } else {
    return getSystemTheme();
  }
};

const reducer = (state: string, action: string) => {
  storeTheme(action);
  return action;
};

interface props {
  children: React.ReactNode;
}

const ThemeContextProvider = ({ children }: props) => {
  const [state, dispatch] = useReducer(reducer, initialTheme());

  return (
    <ThemeContext.Provider value={{ themeMode: state, setTheme: dispatch }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
