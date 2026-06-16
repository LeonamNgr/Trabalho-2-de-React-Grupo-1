import { Link } from "react-router-dom";
import styles from "./CardLivroEncontrado.module.css";

export const CardLivroEncontrado = ({ livro }) => (
  <article className={styles.card}>
    <h2>{livro.nome}</h2>
    <p>
      <strong>Autor:</strong> {livro.autor}
    </p>
    <p>
      <strong>Gênero:</strong> {livro.genero}
    </p>
    <Link
      to={`/livros/editar/${livro.id}`}
      className={`btn btn-marrom ${styles.botaoCard}`}
    >
      Editar Livro
    </Link>
  </article>
);
