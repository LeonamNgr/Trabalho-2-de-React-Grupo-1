import styles from "./Footer.module.css";
import { FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className={styles.footerContainer}>
      
      <h5>Biblioteca: Era uma vez ltda.</h5>
      <p>Endereço: Rua Afrânio Melo Franco 333 - Quitandinha, Petrópolis - RJ</p>
      <p>CNPJ: 23.435.111/0001-11</p>
      <p>Direitos reservados - Grupo 1</p>
          
      <div>
        <p>Nos sigam nas redes sociais:</p>
        <div className={styles.socialIcons}>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram size={28} />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook size={28} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter size={28} />
          </a>
        </div>
      </div>
      
      <div className={styles.footerBottom}>
        © 2026 Biblioteca Era uma vez ltda.
      </div>
    </footer>
  );
};

export default Footer;


      