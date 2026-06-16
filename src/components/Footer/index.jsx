import styles from "../Footer/Footer.module.css";
import { FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className={styles.footerContainer}>
      <h5>Sistema de Gerenciamento de Biblioteca: Era uma vez Ltda.</h5>

      <p>
        Endereço: Rua Afrânio Melo Franco, 333 - Quitandinha, Petrópolis - RJ
      </p>

      <p>CNPJ: 23.435.111/0001-11</p>

      <p>Direitos reservados - Grupo 1</p>

      <div>
        <p>Siga-nos nas redes sociais:</p>

        <div className={styles.socialIcons}>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <FaInstagram size={28} />
          </a>

          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <FaFacebook size={28} />
          </a>

          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
          >
            <FaTwitter size={28} />
          </a>
        </div>
      </div>

      <div className={styles.footerBottom}>
        © 2026 Biblioteca Era uma vez Ltda.
      </div>
    </footer>
  );
};

export default Footer;
