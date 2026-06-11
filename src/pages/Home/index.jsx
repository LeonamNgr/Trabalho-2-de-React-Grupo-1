import { useEffect, useState } from "react";
import { buscarTodosOsLivros } from "../../service/api";
import styles from "./Home.module.css";

export default function Home() {
  const [livros, setLivros] = useState([]);
  const [busca, setBusca] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarLivros() {
      try {
        const dados = await buscarTodosOsLivros();
        setLivros(dados);
      } catch (error) {
        console.error("Erro ao buscar livros:", error);
      } finally {
        setLoading(false);
      }
    }

    carregarLivros();
  }, []);

  const livrosFiltrados = livros.filter((livro) =>
    livro.titulo.toLowerCase().includes(busca.toLowerCase()),
  );

  return (
    <main className={styles.container}>
      <h1 className={styles.titulo}>Biblioteca Era Uma vez...</h1>
      <p className={styles.subtitulo}>Sistema de gerenciamento de livros</p>

      <input
        className="form-control mb-4"
        type="text"
        placeholder="Filtrar por título"
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
      />

      {loading ? (
        <p className="text-center">Carregando livros...</p>
      ) : (
        <section className={styles.lista}>
          {livrosFiltrados.map((livro) => (
            <article className={styles.cardLivro} key={livro.id}>
              <h3>{livro.titulo}</h3>
              <p>ISBN: {livro.isbn}</p>
              <p>Ano: {livro.anoPublicacao}</p>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}
