import { useState, useEffect } from "react";
import styles from "./acessibilidade.module.css";
import iconeAcessibilidade from "../../assets/imagens/icone-acessibilidade.svg";

export default function Acessibilidade() {
  const [aberto, setAberto] = useState(false);
  const [altoContraste, setAltoContraste] = useState(false);
  const [tamanhoFonte, setTamanhoFonte] = useState(100);

  useEffect(() => {
    const contrasteSalvo = localStorage.getItem("alto-contraste") === "true";
    const fonteSalva = localStorage.getItem("tamanho-fonte");

    if (contrasteSalvo) {
      setAltoContraste(true);
      document.body.classList.add("alto-contraste-visual");
    }

    if (fonteSalva) {
      const tamanho = parseInt(fonteSalva, 10);
      setTamanhoFonte(tamanho);
      document.documentElement.style.fontSize = `${tamanho}%`;
    }
  }, []);

  function toggleContraste() {
    const novoContraste = !altoContraste;
    setAltoContraste(novoContraste);
    localStorage.setItem("alto-contraste", novoContraste);

    if (novoContraste) {
      document.body.classList.add("alto-contraste-visual");
    } else {
      document.body.classList.remove("alto-contraste-visual");
    }
  }

  function alterarFonte(delta) {
    let novoTamanho = tamanhoFonte + delta;
    
    if (novoTamanho < 80) novoTamanho = 80;
    if (novoTamanho > 150) novoTamanho = 150;

    setTamanhoFonte(novoTamanho);
    localStorage.setItem("tamanho-fonte", novoTamanho);
    document.documentElement.style.fontSize = `${novoTamanho}%`;
  }

  function resetarConfiguracoes() {
    setAltoContraste(false);
    setTamanhoFonte(100);
    localStorage.removeItem("alto-contraste");
    localStorage.removeItem("tamanho-fonte");
    document.body.classList.remove("alto-contraste-visual");
    document.documentElement.style.fontSize = "100%";
  }

  return (
    <div className={styles.containerAcessibilidade}>
      {aberto && (
        <div className={styles.menuOpcoes}>
          <div className={styles.menuHeader}>
            <span>Acessibilidade</span>
            <button onClick={() => setAberto(false)} className={styles.btnFechar} aria-label="Fechar menu">
              &times;
            </button>
          </div>
          
          <div className={styles.botoesContainer}>
            <button 
              onClick={() => alterarFonte(10)} 
              className={styles.btnAcao}
              title="Aumentar texto"
            >
              A+
            </button>
            <button 
              onClick={() => alterarFonte(-10)} 
              className={styles.btnAcao}
              title="Diminuir texto"
            >
              A-
            </button>
            <button 
              onClick={toggleContraste} 
              className={`${styles.btnAcao} ${altoContraste ? styles.ativo : ""}`}
              title="Alto Contraste"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
        aria-label="Abrir menu de acessibilidade"
        title="Opções de Acessibilidade"
      >
        <img src={iconeAcessibilidade} alt="Ícone de Acessibilidade" />
      </button>
    </div>
  );
}
