import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ThemeContext } from "../../contexts/ThemeContext";
import { AuthContext } from "../../contexts/AuthContext";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { logout, isLogged } = useContext(AuthContext);
  const [menuAberto, setMenuAberto] = useState(false);
  const navigate = useNavigate();

  if (!isLogged) {
    return null;
  }

  const links = [
    { label: "Início", path: "/home" },
    { label: "Todos os livros", path: "/livros" },
    { label: "Cadastrar livro", path: "/livros/adicionar" },
    { label: "Buscar por ID", path: "/livros/buscar" },
  ];

  function fecharMenu() {
    setMenuAberto(false);
  }

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <NavLink className={styles.marca} to="/home" onClick={fecharMenu}>
          <img
            src="/imagens/logo-redonda-fundo-verde.svg"
            alt="Logo da Biblioteca Era uma vez"
            className={styles.logo}
          />

          <span className={styles.nomeBiblioteca}>Era uma vez...</span>
        </NavLink>
        <button
          type="button"
          className={styles.menuButton}
          onClick={() => setMenuAberto((aberto) => !aberto)}
          aria-label="Abrir ou fechar menu"
          aria-expanded={menuAberto}
        >
          ☰
        </button>

        <div
          className={`${styles.menu} ${menuAberto ? styles.menuAberto : ""}`}
        >
          <div className={styles.links}>
            {links.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={fecharMenu}
                className={({ isActive }) =>
                  `${styles.link} ${isActive ? styles.ativo : ""}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          <div className={styles.acoes}>
            <button
              type="button"
              className={styles.tema}
              onClick={toggleTheme}
              title="Alternar tema"
              aria-label="Alternar tema"
            >
              {theme === "light" ? "🌙" : "☀️"}
            </button>

            <button
              type="button"
              className={styles.sair}
              onClick={handleLogout}
            >
              Sair
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
