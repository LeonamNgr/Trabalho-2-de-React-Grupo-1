import { Link } from "react-router-dom";
import styles from "./CardLivroSimples.module.css";

import livroAberto from "../../assets/imagens/livro-aberto.svg";
import pilhaLivros from "../../assets/imagens/pilha-livros.svg";
import estante from "../../assets/imagens/estante.svg";
import livrosLivroAberto from "../../assets/imagens/livros-livro-aberto.svg";
import nichoLivros from "../../assets/imagens/nicho-livros.svg";

const ICONES_LIVROS = [
  livroAberto,
  pilhaLivros,
  estante,
  livrosLivroAberto,
  nichoLivros,
  livrosLivroAberto,
];

export const CardLivroSimples = ({ livro, index }) => (
  <Link to="/livros">
    <article className={styles.cardLivro}>
      <div className={styles.iconeLivro}>
        <img
          src={ICONES_LIVROS[index % ICONES_LIVROS.length]}
          alt={`Ícone ilustrativo para o livro ${livro.titulo}`}
        />
      </div>

      <h3>{livro.titulo}</h3>

      <p>
        <strong>ISBN:</strong> {livro.isbn || "Não informado"}
      </p>

      <p>
        <strong>Ano:</strong> {livro.anoPublicacao || "Não informado"}
      </p>
    </article>
  </Link>
);
