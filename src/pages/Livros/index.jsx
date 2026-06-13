import { useEffect, useState } from "react";
import CardLivro from "../../components/CardLivro";
import {
  buscarTodosOsLivros,
  extrairMensagemErro,
} from "../../service/api";

export default function Livros() {
  const [livros, setLivros] = useState([]);
  const [busca, setBusca] = useState("");
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregarLivros() {
      try {
        const dados = await buscarTodosOsLivros();
        setLivros(Array.isArray(dados) ? dados : []);
      } catch (error) {
        setErro(
          extrairMensagemErro(
            error,
            "Não foi possível carregar os livros.",
          ),
        );
      } finally {
        setLoading(false);
      }
    }

    carregarLivros();
  }, []);

  const textoBusca = busca.trim().toLowerCase();

  const livrosFiltrados = livros.filter((livro) => {
    const campos = [
      livro.titulo,
      livro.isbn,
      livro.anoPublicacao,
      livro.autorNome,
      livro.editoraNome,
      livro.generoSigla,
    ];

    return campos.some((campo) =>
      String(campo ?? "")
        .toLowerCase()
        .includes(textoBusca),
    );
  });

  return (
    <main className="main-container container">
      <h1 className="page-title">Listagem de livros</h1>

      <p className="page-subtitle">
        Consulte os livros cadastrados na API da biblioteca.
      </p>

      <div className="mb-4">
        <label htmlFor="filtro-livros" className="form-label fw-semibold">
          Filtrar livros
        </label>

        <input
          id="filtro-livros"
          type="search"
          className="form-control"
          placeholder="Título, autor, editora, gênero, ISBN ou ano"
          value={busca}
          onChange={(event) => setBusca(event.target.value)}
        />
      </div>

      {loading && (
        <p className="text-center">Carregando livros...</p>
      )}

      {erro && (
        <div className="alert alert-danger text-center">{erro}</div>
      )}

      {!loading && !erro && livros.length === 0 && (
        <div className="alert alert-warning text-center">
          Nenhum livro foi encontrado na API.
        </div>
      )}

      {!loading &&
        !erro &&
        livros.length > 0 &&
        livrosFiltrados.length === 0 && (
          <div className="alert alert-warning text-center">
            Nenhum livro encontrado com esse filtro.
          </div>
        )}

      <div className="row g-4">
        {livrosFiltrados.map((livro) => (
          <CardLivro key={livro.id} livro={livro} />
        ))}
      </div>
    </main>
  );
}
