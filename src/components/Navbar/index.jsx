import styles from "./Navbar.module.css";

export default function Navbar() {
  const navLinks = [
    { id: 1, label: "Início", path: "/" },
    { id: 2, label: "Cadastrar Livro", path: "/cadastrar" },
  ];

  return (
    <nav
      className={`navbar navbar-expand-lg bg-body-tertiary ${styles.navbarCustom}`}
    >
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          📚 Biblioteca
        </a>

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
                <a className="nav-link" href={link.path}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

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
    </nav>
  );
}
