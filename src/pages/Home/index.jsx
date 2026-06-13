import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { buscarTodosOsLivros } from "../../service/api";
import styles from "./Home.module.css";

import livroAberto from "../../assets/imagens/livro-aberto.svg";
import pilhaLivros from "../../assets/imagens/pilha-livros.svg";
import estante from "../../assets/imagens/estante.svg";
import livrosLivroAberto from "../../assets/imagens/livros-livro-aberto.svg";
import nichoLivros from "../../assets/imagens/nicho-livros.svg";
import meninaVoandoLivro from "../../assets/imagens/menina-voando-livro.svg";

export default function Home() {
  const [livros, setLivros] = useState([]);
  const [busca, setBusca] = useState("");
  const [loading, setLoading] = useState(true);

  const iconesLivros = [
    livroAberto,
    pilhaLivros,
    estante,
    livrosLivroAberto,
    nichoLivros,
    livrosLivroAberto,
  ];

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
    livro.titulo?.toLowerCase().includes(busca.toLowerCase()),
  );

  return (
    <main className={styles.container}>
      <section className={styles.hero}>
        <div>
          <p className={styles.tag}>Sistema de gerenciamento de biblioteca</p>

          <h1 className={styles.titulo}>Era uma vez...</h1>

          <p className={styles.subtitulo}>
            Organize, consulte e gerencie os livros cadastrados no arquivo da
            biblioteca de forma simples e rápida.
          </p>

          <div className={styles.botoes}>
            <Link to="/livros" className="btn btn-marrom">
              Ver todos os livros
            </Link>

            <Link to="/livros/adicionar" className={styles.botaoSecundario}>
              Cadastrar livro
            </Link>
          </div>
        </div>

        <div className={styles.caixaDestaque}>
          <img
            src={meninaVoandoLivro}
            alt="Menina voando em um livro"
            className={styles.imagemHero}
          />

          <div className={styles.contadorLivros}>
            <h2>{livros.length}</h2>
            <p>livros cadastrados!</p>
          </div>
        </div>
      </section>

      <section className={styles.resumo}>
        <Link to="/livros/buscar" className={styles.cardResumo}>
          <h3>Consulta rápida</h3>
          <p>Busque livros cadastrados por título.</p>
        </Link>

        <Link to="/livros/adicionar" className={styles.cardResumo}>
          <h3>Cadastro</h3>
          <p>Adicione novos livros ao sistema.</p>
        </Link>

        <Link to="/livros" className={styles.cardResumo}>
          <h3>Gerenciamento</h3>
          <p>Visualize, edite e acompanhe os registros.</p>
        </Link>
      </section>

      <section className={styles.areaLivros}>
        <div className={styles.cabecalhoLista}>
          <div>
            <h2>Prévia dos livros</h2>
            <p>Veja alguns livros disponíveis no sistema.</p>
          </div>

          <input
            className={`form-control ${styles.inputBusca}`}
            type="text"
            placeholder="Filtrar por título"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>

        {loading ? (
          <p className="text-center">Carregando livros...</p>
        ) : livrosFiltrados.length === 0 ? (
          <div className="alert alert-warning text-center">
            Nenhum livro encontrado.
          </div>
        ) : (
          <section className={styles.lista}>
            {livrosFiltrados.slice(0, 6).map((livro, index) => (
              <Link
                key={livro.id}
                to="/livros"
                className={styles.linkCard}
              >
                <article className={styles.cardLivro}>
                  <div className={styles.iconeLivro}>
                    <img
                      src={iconesLivros[index % iconesLivros.length]}
                      alt="Ícone de livro"
                    />
                  </div>

                  <h3>{livro.titulo}</h3>

                  <p>
                    <strong>ISBN:</strong> {livro.isbn || "Não informado"}
                  </p>

                  <p>
                    <strong>Ano:</strong>{" "}
                    {livro.anoPublicacao || "Não informado"}
                  </p>
                </article>
              </Link>
            ))}
          </section>
        )}
      </section>
    </main>
  );
}