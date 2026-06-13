import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext.jsx";
import styles from "./Navbar.module.css";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      className={styles.themeToggle}
      onClick={toggleTheme}
      type="button"
      title={theme === "light" ? "Ativar modo escuro" : "Ativar modo claro"}
    >
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
}
