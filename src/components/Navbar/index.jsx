import { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../contexts/ThemeContext.jsx";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const navLinks = [
    { id: 1, label: "Início", path: "/home" },
    { id: 2, label: "Cadastrar Livro", path: "/livros/adicionar" },
    { id: 3, label: "Buscar Livros", path: "/livros/buscar" },
  ];

  return (
    <nav
      className={`navbar navbar-expand-lg bg-body-tertiary ${styles.navbarCustom}`}
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/home">
          📚 Biblioteca
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {navLinks.map((link) => (
              <li className="nav-item" key={link.id}>
                <Link className="nav-link" to={link.path}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="d-flex align-items-center">
            {/* Botão de Dark Mode */}
            <button 
              className="btn btn-outline-secondary me-3" 
              onClick={toggleTheme}
              type="button"
              aria-label="Alternar tema"
              title="Alternar tema"
            >
              {theme === "light" ? "🌙" : "☀️"}
            </button>

            {/* Mantivemos a barra de pesquisa que será perfeita para buscar um livro específico */}
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Buscar livro..."
                aria-label="Buscar"
              />
              <button className="btn btn-outline-success" type="submit">
                Buscar
              </button>
            </form>
          </div>
        </div>
      </div>
    </nav>
  );
}
