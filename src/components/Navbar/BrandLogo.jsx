import { Link } from "react-router-dom";
import pilhaLivros from "../../assets/imagens/pilha-livros.svg";
import styles from "./Navbar.module.css";

export default function BrandLogo({ isLogged }) {
  return (
    <Link className={styles.navbarBrand} to={!isLogged ? "/sobre" : "/home"}>
      <img
        src={pilhaLivros}
        alt="Logo da Biblioteca"
        className={styles.navbarLogo}
      />
      <span className={styles.navbarTitle}>Era uma vez...</span>
    </Link>
  );
}
