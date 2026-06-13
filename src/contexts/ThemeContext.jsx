/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const temaSalvo = localStorage.getItem("app-theme");
    return temaSalvo === "dark" ? "dark" : "light";
  });

  useEffect(() => {
    localStorage.setItem("app-theme", theme);
    document.documentElement.setAttribute("data-bs-theme", theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((temaAtual) =>
      temaAtual === "light" ? "dark" : "light",
    );
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
