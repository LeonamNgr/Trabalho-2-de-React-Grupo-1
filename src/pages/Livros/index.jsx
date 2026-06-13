import { useEffect, useState } from "react";
import { buscarTodosOsLivros } from "../../service/api";
import CardLivro from "../../components/CardLivro";

export default function Livros() {
  const [livros, setLivros] = useState([]);
  const [busca, setBusca] = useState("");
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregarLivros() {
      try {
        const dados = await buscarTodosOsLivros();
        setLivros(dados);
      } catch (error) {
        console.error("Erro ao buscar livros:", error);
        setErro("Não foi possível carregar os livros da API.");
      } finally {
        setLoading(false);
      }
    }

    carregarLivros();
  }, []);

  const textoBusca = busca.toLowerCase().trim();

  const livrosFiltrados = livros.filter((livro) => {
    const titulo = livro.titulo?.toLowerCase() || "";
    const isbn = livro.isbn?.toLowerCase() || "";
    const ano = livro.anoPublicacao?.toString() || "";

    const autor =
      livro.autor?.nome?.toLowerCase() ||
      livro.autor?.toLowerCase() ||
      "";

    const editora =
      livro.editora?.nome?.toLowerCase() ||
      livro.editora?.toLowerCase() ||
      "";

    const genero =
      livro.genero?.nome?.toLowerCase() ||
      livro.genero?.toLowerCase() ||
      "";

    return (
      titulo.includes(textoBusca) ||
      isbn.includes(textoBusca) ||
      ano.includes(textoBusca) ||
      autor.includes(textoBusca) ||
      editora.includes(textoBusca) ||
      genero.includes(textoBusca)
    );
  });

  return (
    <main className="main-container container">
      <h1 className="page-title">Listagem de Livros</h1>

      <p className="page-subtitle">
        Consulte os livros cadastrados na API da biblioteca.
      </p>

      <div className="mb-4">
        <input
          type="search"
          className="form-control"
          placeholder="Filtrar por título, autor, editora, gênero, ISBN ou ano"
          value={busca}
          onChange={(event) => setBusca(event.target.value)}
        />
      </div>

      {loading && (
        <p className="text-center">
          Carregando livros...
        </p>
      )}

      {erro && (
        <div className="alert alert-danger text-center">
          {erro}
        </div>
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

      {!loading && !erro && (
        <div className="row g-4">
          {livrosFiltrados.map((livro) => (
            <CardLivro
              key={livro.id}
              livro={livro}
            />
          ))}
        </div>
      )}
    </main>
  );
}