import { useState, useEffect } from "react";

const FONTE_PADRAO = 100;
const FONTE_MINIMA = 80;
const FONTE_MAXIMA = 150;
const INCREMENTO = 10;

export function useAcessibilidade() {
  const [altoContraste, setAltoContraste] = useState(
    () => localStorage.getItem("alto-contraste") === "true",
  );

  const [tamanhoFonte, setTamanhoFonte] = useState(() => {
    const fonteSalva = localStorage.getItem("tamanho-fonte");
    return fonteSalva ? parseInt(fonteSalva, 10) : FONTE_PADRAO;
  });

  useEffect(() => {
    localStorage.setItem("alto-contraste", altoContraste);
    if (altoContraste) {
      document.body.classList.add("alto-contraste-visual");
    } else {
      document.body.classList.remove("alto-contraste-visual");
    }
  }, [altoContraste]);

  useEffect(() => {
    localStorage.setItem("tamanho-fonte", tamanhoFonte);
    document.documentElement.style.fontSize = `${tamanhoFonte}%`;
  }, [tamanhoFonte]);

  const toggleContraste = () => setAltoContraste((prev) => !prev);

  const alterarFonte = (delta) => {
    setTamanhoFonte((prev) =>
      Math.min(Math.max(prev + delta, FONTE_MINIMA), FONTE_MAXIMA),
    );
  };

  const resetarConfiguracoes = () => {
    setAltoContraste(false);
    setTamanhoFonte(FONTE_PADRAO);
  };

  return {
    altoContraste,
    toggleContraste,
    alterarFonte,
    resetarConfiguracoes,
    INCREMENTO,
  };
}
