import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext.jsx";
import {
  buscarAutores,
  buscarGeneros,
  buscarTodosOsLivros,
} from "../../service/api";
import styles from "./BuscarLivro.module.css";

export default function BuscarLivro() {
  const { isLogged } = useContext(AuthContext);
  const usuarioLogado = isLogged === true || isLogged === "true";

  const [tipoBusca, setTipoBusca] = useState("nome");
  const [termoBusca, setTermoBusca] = useState("");
  const [livrosEncontrados, setLivrosEncontrados] = useState([]);
  const [mensagem, setMensagem] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [buscaRealizada, setBuscaRealizada] = useState(false);
  const [listaAutores, setListaAutores] = useState([]);
  const [listaGeneros, setListaGeneros] = useState([]);

  useEffect(() => {
    async function carregarListasAuxiliares() {
      try {
        const [autoresData, generosData] = await Promise.all([
          buscarAutores(),
          buscarGeneros(),
        ]);

        setListaAutores(autoresData);
        setListaGeneros(generosData);
      } catch (error) {
        console.error("Erro ao carregar listas auxiliares:", error);
      }
    }

    carregarListasAuxiliares();
  }, []);

  function normalizarTexto(texto) {
    return String(texto ?? "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();
  }

  function pegarNomeLivro(livro) {
    return livro.titulo || livro.nome || livro.nomeLivro || "";
  }

  function pegarAutor(livro) {
    if (livro.autorNome) {
      return livro.autorNome;
    }

    if (livro.autor?.nome) {
      return livro.autor.nome;
    }

    const id = livro.autorId || livro.autorid;

    if (id) {
      const autorEncontrado = listaAutores.find(
        (autor) => String(autor.id) === String(id),
      );

      if (autorEncontrado) {
        return autorEncontrado.nome;
      }
    }

    return "Autor não informado";
  }

  function pegarGenero(livro) {
    if (livro.generoSigla) {
      return livro.generoSigla;
    }

    if (livro.genero?.nome) {
      return livro.genero.nome;
    }

    const id = livro.generoId || livro.generold;

    if (id) {
      const generoEncontrado = listaGeneros.find(
        (genero) => String(genero.id) === String(id),
      );

      if (generoEncontrado) {
        return `${generoEncontrado.nome} (${generoEncontrado.sigla})`;
      }
    }

    return "Gênero não informado";
  }

  async function buscarLivros(evento) {
    evento.preventDefault();

    const termo = normalizarTexto(termoBusca);

    if (!termo) {
      setMensagem("Digite uma informação para realizar a busca.");
      setLivrosEncontrados([]);
      setBuscaRealizada(false);
      return;
    }

    try {
      setCarregando(true);
      setMensagem("");
      setLivrosEncontrados([]);
      setBuscaRealizada(false);

      const dados = await buscarTodosOsLivros();

      const listaLivros = Array.isArray(dados)
        ? dados
        : Array.isArray(dados.content)
          ? dados.content
          : [];

      const livrosFiltrados = listaLivros.filter((livro) => {
        let valorParaComparar = "";

        if (tipoBusca === "nome") {
          valorParaComparar = pegarNomeLivro(livro);
        } else if (tipoBusca === "autor") {
          valorParaComparar = pegarAutor(livro);
        } else if (tipoBusca === "genero") {
          valorParaComparar = pegarGenero(livro);
        }

        return normalizarTexto(valorParaComparar).includes(termo);
      });

      setLivrosEncontrados(livrosFiltrados);
      setBuscaRealizada(true);

      if (livrosFiltrados.length === 0) {
        setMensagem("Nenhum livro foi encontrado na base de dados.");
      }
    } catch (erro) {
      console.error("Erro ao buscar livros:", erro);
      setMensagem(erro.message || "Não foi possível consultar os livros.");
      setBuscaRealizada(false);
    } finally {
      setCarregando(false);
    }
  }

  function trocarTipoBusca(evento) {
    setTipoBusca(evento.target.value);
    setTermoBusca("");
    setLivrosEncontrados([]);
    setMensagem("");
    setBuscaRealizada(false);
  }

  return (
    <main className={`pagina-formulario ${styles.container}`}>
      <section className={`formulario-card ${styles.busca}`}>
        <header className={styles.cabecalho}>
          <h1 className="formulario-titulo">Buscar Livros</h1>

          <p>
            Consulte se um livro está disponível em nossa base de dados.
          </p>
        </header>

        <form className={styles.formulario} onSubmit={buscarLivros}>
          <div className={styles.campo}>
            <label className="form-label" htmlFor="tipoBusca">
              Buscar por
            </label>

            <select
              id="tipoBusca"
              className="form-select"
              value={tipoBusca}
              onChange={trocarTipoBusca}
            >
              <option value="nome">Nome do livro</option>
              <option value="autor">Autor</option>
              <option value="genero">Gênero</option>
            </select>
          </div>

          <div className={styles.campo}>
            <label className="form-label" htmlFor="termoBusca">
              Digite sua busca
            </label>

            <input
              id="termoBusca"
              className="form-control"
              type="search"
              value={termoBusca}
              onChange={(evento) => setTermoBusca(evento.target.value)}
              placeholder={
                tipoBusca === "nome"
                  ? "Digite o nome do livro"
                  : tipoBusca === "autor"
                    ? "Digite o nome do autor"
                    : "Digite o gênero do livro"
              }
            />
          </div>

          <button
            type="submit"
            className={`btn btn-marrom btn-formulario ${styles.botaoBusca}`}
            disabled={carregando}
          >
            {carregando ? "Buscando..." : "Buscar"}
          </button>
        </form>

        {mensagem && (
          <p className={styles.mensagem} role="alert">
            {mensagem}
          </p>
        )}
      </section>

      {buscaRealizada && livrosEncontrados.length > 0 && (
        <section className={styles.resultados}>
          {!usuarioLogado ? (
            <article className={styles.card}>
              <h2>Livro encontrado!</h2>

              <p className={styles.disponivel}>
                {livrosEncontrados.length === 1
                  ? "O livro está cadastrado em nossa base de dados."
                  : `Encontramos ${livrosEncontrados.length} livros correspondentes na base de dados.`}
              </p>

              <div className={styles.avisoLogin}>
                <p>Faça o login para acessar os dados do livro.</p>

                <Link to="/" className={`btn btn-marrom ${styles.botaoCard}`}>
                  Fazer login
                </Link>
              </div>
            </article>
          ) : (
            livrosEncontrados.map((livro, index) => {
              const livroId = livro.id || livro.idLivro;

              return (
                <article
                  key={livroId || index}
                  className={styles.card}
                >
                  <h2>{pegarNomeLivro(livro) || "Nome não informado"}</h2>

                  <p>
                    <strong>Autor:</strong> {pegarAutor(livro)}
                  </p>

                  <p>
                    <strong>Gênero:</strong> {pegarGenero(livro)}
                  </p>

                  <Link
                    to={`/livros/editar/${livroId}`}
                    className={`btn btn-marrom ${styles.botaoCard}`}
                  >
                    Editar Livro
                  </Link>
                </article>
              );
            })
          )}
        </section>
      )}
    </main>
  );
}