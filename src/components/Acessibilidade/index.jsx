import { useState } from "react";
import styles from "./Acessibilidade.module.css";
import iconeAcessibilidade from "../../assets/imagens/icone-acessibilidade.svg";
import { useAcessibilidade } from "../../hooks/useAcessibilidade";

export default function Acessibilidade() {
  const [aberto, setAberto] = useState(false);

  const {
    altoContraste,
    toggleContraste,
    alterarFonte,
    resetarConfiguracoes,
    INCREMENTO,
  } = useAcessibilidade();

  return (
    <div className={styles.containerAcessibilidade}>
      {aberto && (
        <div className={styles.menuOpcoes}>
          <div className={styles.menuHeader}>
            <span>Acessibilidade</span>
            <button
              onClick={() => setAberto(false)}
              className={styles.btnFechar}
              aria-label="Fechar menu de acessibilidade"
            >
              &times;
            </button>
          </div>

          <div className={styles.botoesContainer}>
            <button
              onClick={() => alterarFonte(INCREMENTO)}
              className={styles.btnAcao}
              title="Aumentar texto"
            >
              A+
            </button>
            <button
              onClick={() => alterarFonte(-INCREMENTO)}
              className={styles.btnAcao}
              title="Diminuir texto"
            >
              A-
            </button>
            <button
              onClick={toggleContraste}
              aria-pressed={altoContraste}
              className={`${styles.btnAcao} ${altoContraste ? styles.ativo : ""}`}
              title="Alto Contraste"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 2a10 10 0 0 0 0 20z"></path>
              </svg>
            </button>
          </div>

          <button onClick={resetarConfiguracoes} className={styles.btnReset}>
            Restaurar Padrão
          </button>
        </div>
      )}

      <button
        onClick={() => setAberto(!aberto)}
        className={styles.btnFlutuante}
        aria-expanded={aberto}
        aria-label="Opções de Acessibilidade"
        title="Opções de Acessibilidade"
      >
        <img src={iconeAcessibilidade} alt="" aria-hidden="true" />
      </button>
    </div>
  );
}
