import { useContext } from "react";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { ThemeContext } from "../../contexts/ThemeContext.jsx";
import { AuthContext } from "../../contexts/AuthContext.jsx";

import pilhaLivros from "../../assets/imagens/pilha-livros.svg";

import styles from "./Navbar.module.css";

export default function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { logout, isLogged } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();

  const estaEmRotaPublica =
    location.pathname === "/" ||
    location.pathname === "/login" ||
    location.pathname === "/sobre";

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  /*
    Navbar das páginas públicas:
    Login e Sobre nós.e
  */
  if (estaEmRotaPublica) {
    return (
      <nav className={styles.navbar}>
        <div className={styles.navbarContainer}>
          <Link
            className={styles.navbarBrand}
            to="/sobre"
          >
            <img
              src={pilhaLivros}
              alt="Logo da Biblioteca"
              className={styles.navbarLogo}
            />

            <span className={styles.navbarTitle}>
              Biblioteca
            </span>
          </Link>

          <div className={styles.navActions}>
            {location.pathname === "/sobre" && (
              <Link
                to="/login"
                className={styles.navLink}
              >
                Voltar ao login
              </Link>
            )}

            <button
              className={styles.themeToggle}
              onClick={toggleTheme}
              type="button"
              aria-label={
                theme === "light"
                  ? "Ativar modo escuro"
                  : "Ativar modo claro"
              }
              title={
                theme === "light"
                  ? "Ativar modo escuro"
                  : "Ativar modo claro"
              }
            >
              {theme === "light" ? "🌙" : "☀️"}
            </button>
          </div>
        </div>
      </nav>
    );
  }

  if (isLogged !== true) {
    return null;
  }

  const navLinks = [
    {
      id: 1,
      label: "Início",
      path: "/home",
    },
    {
      id: 2,
      label: "Todos os Livros",
      path: "/livros",
    },
    {
      id: 3,
      label: "Cadastrar Livro",
      path: "/livros/adicionar",
    },
    {
      id: 4,
      label: "Buscar Livros",
      path: "/livros/buscar",
    },
  ];

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <Link
          className={styles.navbarBrand}
          to="/home"
        >
          <img
            src={pilhaLivros}
            alt="Logo da Biblioteca"
            className={styles.navbarLogo}
          />

          <span className={styles.navbarTitle}>
            Biblioteca
          </span>
        </Link>

        <button
          className={styles.navbarToggler}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Abrir ou fechar menu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className={`collapse navbar-collapse ${styles.navbarCollapse}`}
          id="navbarCollapse"
        >
          <ul className={styles.navLinks}>
            {navLinks.map((link) => (
              <li
                className={styles.navItem}
                key={link.id}
              >
                <Link
                  className={styles.navLink}
                  to={link.path}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className={styles.navActions}>
            <button
              className={styles.themeToggle}
              onClick={toggleTheme}
              type="button"
              aria-label={
                theme === "light"
                  ? "Ativar modo escuro"
                  : "Ativar modo claro"
              }
              title={
                theme === "light"
                  ? "Ativar modo escuro"
                  : "Ativar modo claro"
              }
            >
              {theme === "light" ? "🌙" : "☀️"}
            </button>

            <button
              className={styles.logoutBtn}
              onClick={handleLogout}
              type="button"
              title="Sair da conta"
            >
              Sair
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}