import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext.jsx";

import BrandLogo from "./BrandLogo";
import ThemeToggle from "./ThemeToggle";
import Acessibilidade from "../Acessibilidade";
import { navLinks } from "./navLinks";

import styles from "./Navbar.module.css";

export default function Navbar() {
  const { logout, isLogged } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const isSobrePage = location.pathname === "/sobre";

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <BrandLogo isLogged={isLogged} />

        {!isLogged ? (
          <div className={styles.navActions}>
            <Link
              to={isSobrePage ? "/login" : "/sobre"}
              className={styles.navLink}
            >
              {isSobrePage ? "Voltar ao login" : "Sobre nós"}
            </Link>
            <Acessibilidade />
            <ThemeToggle />
          </div>
        ) : (
          <>
            <button
              className={styles.navbarToggler}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarCollapse"
              aria-controls="navbarCollapse"
              aria-expanded="false"
              aria-label="Alternar navegação"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div
              className={`collapse navbar-collapse ${styles.navbarCollapse}`}
              id="navbarCollapse"
            >
              <ul className={styles.navLinks}>
                {navLinks.map(({ id, path, label }) => (
                  <li className={styles.navItem} key={id}>
                    <Link className={styles.navLink} to={path}>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className={styles.navActions}>
                <Acessibilidade />
                <ThemeToggle />
                <button
                  className={styles.logoutBtn}
                  onClick={handleLogout}
                  type="button"
                >
                  Sair
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}
