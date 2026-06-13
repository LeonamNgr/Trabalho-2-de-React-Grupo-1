import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { buscarTodosOsLivros, extrairMensagemErro } from "../../service/api";
import styles from "./Home.module.css";

export default function Home() {
  const [livros, setLivros] = useState([]);
  const [busca, setBusca] = useState("");
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  const iconesLivros = [
    "/imagens/livro-aberto.svg",
    "/imagens/pilha-livros.svg",
    "/imagens/estante.svg",
    "/imagens/livros-livro-aberto.svg",
    "/imagens/nicho-livros.svg",
    "/imagens/livros-voando.svg",
  ];

  useEffect(() => {
    async function carregarLivros() {
      try {
        const dados = await buscarTodosOsLivros();
        setLivros(Array.isArray(dados) ? dados : []);
      } catch (error) {
        setErro(
          extrairMensagemErro(error, "Não foi possível carregar os livros."),
        );
      } finally {
        setLoading(false);
      }
    }

    carregarLivros();
  }, []);

  const livrosFiltrados = livros.filter((livro) =>
    String(livro.titulo ?? "")
      .toLowerCase()
      .includes(busca.toLowerCase()),
  );

  return (
    <main className={styles.container}>
      <section className={styles.hero}>
        <div>
          <p className={styles.tag}>Sistema de gerenciamento de bibliotecas</p>

          <h1 className={styles.titulo}>Era uma vez...</h1>

          <p className={styles.subtitulo}>
            Organize, consulte e gerencie os livros cadastrados na biblioteca de
            forma simples e rápida.
          </p>

          <div className={styles.botoes}>
            <Link to="/livros" className={styles.botaoAcao}>
              Ver todos os livros
            </Link>

            <Link to="/livros/adicionar" className={styles.botaoAcao}>
              Cadastrar novo livro
            </Link>
          </div>
        </div>

        <div className={styles.caixaDestaque}>
          <img
            src="/imagens/menina-voando-livro.svg"
            alt="Menina voando em um livro"
            className={styles.imagemHero}
          />

          <div className={styles.contadorLivros}>
            <h2>{livros.length}</h2>
            <p>livros cadastrados</p>
          </div>
        </div>
      </section>

      <section className={styles.resumo}>
        <Link to="/livros/buscar" className={styles.cardResumo}>
          <img
            src="/imagens/livro-aberto.svg"
            alt=""
            className={styles.iconeResumo}
          />

          <div>
            <h2>Consulta rápida</h2>
            <p>Busque um livro cadastrado pelo seu ID.</p>
            <span className={styles.cardChamada}>Buscar livro →</span>
          </div>
        </Link>

        <Link to="/livros/adicionar" className={styles.cardResumo}>
          <img
            src="/imagens/pilha-livros.svg"
            alt=""
            className={styles.iconeResumo}
          />

          <div>
            <h2>Cadastro</h2>
            <p>Adicione novos livros ao sistema.</p>
            <span className={styles.cardChamada}>Cadastrar livro →</span>
          </div>
        </Link>

        <Link to="/livros" className={styles.cardResumo}>
          <img
            src="/imagens/estante.svg"
            alt=""
            className={styles.iconeResumo}
          />

          <div>
            <h2>Gerenciamento</h2>
            <p>Visualize, filtre e edite os registros.</p>
            <span className={styles.cardChamada}>Gerenciar livros →</span>
          </div>
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
            type="search"
            placeholder="Filtrar por título"
            value={busca}
            onChange={(event) => setBusca(event.target.value)}
          />
        </div>

        {loading && <p className="text-center">Carregando livros...</p>}

        {erro && <div className="alert alert-danger text-center">{erro}</div>}

        {!loading && !erro && livrosFiltrados.length === 0 && (
          <div className="alert alert-warning text-center">
            Nenhum livro encontrado.
          </div>
        )}

        {!loading && !erro && livrosFiltrados.length > 0 && (
          <div className={styles.lista}>
            {livrosFiltrados.slice(0, 6).map((livro, index) => (
              <article className={styles.cardLivro} key={livro.id}>
                <div className={styles.iconeLivro}>
                  <img src={iconesLivros[index % iconesLivros.length]} alt="" />
                </div>

                <h3>{livro.titulo}</h3>

                <p>
                  <strong>Autor:</strong> {livro.autorNome || "Não informado"}
                </p>

                <p>
                  <strong>ISBN:</strong> {livro.isbn || "Não informado"}
                </p>

                <p>
                  <strong>Ano:</strong> {livro.anoPublicacao || "Não informado"}
                </p>

                <Link
                  to={`/livros/editar/${livro.id}`}
                  className={styles.linkEditar}
                >
                  Ver detalhes
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
