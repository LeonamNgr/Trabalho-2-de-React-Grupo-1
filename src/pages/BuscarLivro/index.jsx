import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext.jsx";
import styles from "./BuscarLivro.module.css";

export default function BuscarLivro() {
  const { isLogged } = useContext(AuthContext);

  const usuarioLogado =
    isLogged === true || isLogged === "true";

  const [tipoBusca, setTipoBusca] = useState("nome");
  const [termoBusca, setTermoBusca] = useState("");
  const [livrosEncontrados, setLivrosEncontrados] = useState([]);
  const [mensagem, setMensagem] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [buscaRealizada, setBuscaRealizada] = useState(false);

  function normalizarTexto(texto) {
    return String(texto ?? "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();
  }

  function pegarNomeLivro(livro) {
    return livro.nome || livro.titulo || livro.nomeLivro || "";
  }

  function pegarAutor(livro) {
    if (typeof livro.autor === "object") {
      return livro.autor?.nome || "";
    }

    return livro.autor || livro.nomeAutor || "";
  }

  function pegarGenero(livro) {
    if (typeof livro.genero === "object") {
      return livro.genero?.nome || "";
    }

    return (
      livro.genero ||
      livro.nomeGenero ||
      livro.categoria ||
      livro.tipo ||
      ""
    );
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

      const resposta = await fetch("http://localhost:8080/livros", {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      if (!resposta.ok) {
        if (resposta.status === 401 || resposta.status === 403) {
          throw new Error(
            "A API não permite consultar livros antes do login."
          );
        }

        if (resposta.status === 404) {
          throw new Error(
            "O endereço da API de livros não foi encontrado."
          );
        }

        throw new Error(
          `Não foi possível consultar os livros. Erro ${resposta.status}.`
        );
      }

      const dados = await resposta.json();

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
        setMensagem(
          "Nenhum livro foi encontrado na base de dados."
        );
      }
    } catch (erro) {
      console.error("Erro ao buscar livros:", erro);

      setMensagem(
        erro.message ||
          "Não foi possível consultar os livros."
      );

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
    <main className={styles.container}>
      <section className={styles.busca}>
        <h1 className="page-title fonte-rye">
          Buscar livros
        </h1>

        <p>
          Consulte se um livro está disponível em nossa base de dados.
        </p>

        <form onSubmit={buscarLivros}>
          <label htmlFor="tipoBusca">Buscar por</label>

          <select
            id="tipoBusca"
            value={tipoBusca}
            onChange={trocarTipoBusca}
          >
            <option value="nome">Nome do livro</option>
            <option value="autor">Autor</option>
            <option value="genero">Gênero</option>
          </select>

          <label htmlFor="termoBusca">
            Digite sua busca
          </label>

          <input
            id="termoBusca"
            type="search"
            value={termoBusca}
            onChange={(evento) =>
              setTermoBusca(evento.target.value)
            }
            placeholder={
              tipoBusca === "nome"
                ? "Digite o nome do livro"
                : tipoBusca === "autor"
                  ? "Digite o nome do autor"
                  : "Digite o gênero do livro"
            }
          />

          <button
            type="submit"
            className="btn-marrom"
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
                <p>
                  Faça o login para acessar os dados do livro.
                </p>

                <Link to="/" className="btn-marrom">
                  Fazer login
                </Link>
              </div>
            </article>
          ) : (
            livrosEncontrados.map((livro, index) => (
              <article
                key={livro.id || livro.idLivro || index}
                className={styles.card}
              >
                <h2>
                  {pegarNomeLivro(livro) ||
                    "Nome não informado"}
                </h2>

                <p>
                  <strong>Autor:</strong>{" "}
                  {pegarAutor(livro) || "Não informado"}
                </p>

                <p>
                  <strong>Gênero:</strong>{" "}
                  {pegarGenero(livro) || "Não informado"}
                </p>
              </article>
            ))
          )}
        </section>
      )}
    </main>
  );
}