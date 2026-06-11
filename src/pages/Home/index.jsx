import styles from "./Home.module.css";

export default function Home() {
  return (
    <main className={styles.container}>
      <h1 className={styles.titulo}>Livraria React</h1>
      <p className={styles.subtitulo}>
        Sistema de gerenciamento de livros
      </p>

      <section className={styles.lista}>
        <article className={styles.cardLivro}>
          <h3>Dom Casmurro</h3>
          <p>Autor: Machado de Assis</p>
          <p>Ano: 1899</p>
        </article>
      </section>
    </main>
  );
}
