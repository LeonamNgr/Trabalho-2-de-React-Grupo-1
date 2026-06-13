import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext.jsx";

import BrandLogo from "./BrandLogo";
import ThemeToggle from "./ThemeToggle";
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

  if (!isLogged) {
    return (
      <nav className={styles.navbar}>
        <div className={styles.navbarContainer}>
          <BrandLogo isLogged={isLogged} />
          <div className={styles.navActions}>
            {location.pathname === "/sobre" ? (
              <Link to="/login" className={styles.navLink}>
                Voltar ao login
              </Link>
            ) : (
              <Link to="/sobre" className={styles.navLink}>
                Sobre nós
              </Link>
              
            )}
            <ThemeToggle />
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <BrandLogo isLogged={isLogged} />

        <button
          className={styles.navbarToggler}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className={`collapse navbar-collapse ${styles.navbarCollapse}`}
          id="navbarCollapse"
        >
          <ul className={styles.navLinks}>
            {navLinks.map((link) => (
              <li className={styles.navItem} key={link.id}>
                <Link className={styles.navLink} to={link.path}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className={styles.navActions}>
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
      </div>
    </nav>
  );
}
