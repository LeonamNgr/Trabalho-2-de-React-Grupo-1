import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../../contexts/ThemeContext.jsx";
import { AuthContext } from "../../contexts/AuthContext.jsx";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { logout, isLogged } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navLinks = [
    { id: 1, label: "Início", path: "/home" },
    { id: 2, label: "Cadastrar Livro", path: "/livros/adicionar" },
    { id: 3, label: "Buscar Livros", path: "/livros/buscar" },
  ];

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        {/* Logo + Título */}
        <Link className={styles.navbarBrand} to="/home">
          <img
            src="/imagens/pilha-livros.svg"
            alt="Logo Biblioteca"
            className={styles.navbarLogo}
          />
          <span className={styles.navbarTitle}>Biblioteca</span>
        </Link>

        <button
          className={styles.navbarToggler}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${styles.navbarCollapse}`} id="navbarCollapse">
          {/* Links de Navegação */}
          <ul className={styles.navLinks}>
            {navLinks.map((link) => (
              <li className={styles.navItem} key={link.id}>
                <Link className={styles.navLink} to={link.path}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Ações da direita */}
          <div className={styles.navActions}>
            {/* Botão de Dark Mode */}
            <button
              className={styles.themeToggle}
              onClick={toggleTheme}
              type="button"
              aria-label="Alternar tema"
              title="Alternar tema"
            >
              {theme === "light" ? "🌙" : "☀️"}
            </button>

            {/* Barra de pesquisa */}
            <form className={styles.searchForm} role="search">
              <input
                className={styles.searchInput}
                type="search"
                placeholder="Buscar livro..."
                aria-label="Buscar"
              />
              <button className={styles.searchBtn} type="submit">
                Buscar
              </button>
            </form>

            {/* Botão de Logout */}
            {isLogged && (
              <button
                className={styles.logoutBtn}
                onClick={handleLogout}
                type="button"
                title="Sair da conta"
              >
                Sair
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

