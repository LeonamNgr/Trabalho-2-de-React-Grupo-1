import { useEffect, useState, useMemo } from "react";
import { buscarTodosOsLivros } from "../../service/api";
import CardLivro from "../../components/CardLivro";
import Input from "../../components/Input";
import { normalizarTexto } from "../../utils/normalizarTexto";

export default function Livros() {
  const [livros, setLivros] = useState([]);
  const [busca, setBusca] = useState("");
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregarLivros() {
      try {
        const dados = await buscarTodosOsLivros();
        setLivros(Array.isArray(dados) ? dados : dados?.content || []);
      } catch {
        setErro("Não foi possível carregar os livros do sistema.");
      } finally {
        setLoading(false);
      }
    }
    carregarLivros();
  }, []);

  const livrosFiltrados = useMemo(() => {
    if (!busca) return livros;

    const termoBusca = normalizarTexto(busca);

    return livros.filter((livro) => {
      const valoresParaBuscar = [
        livro.titulo || "",
        livro.isbn || "",
        livro.anoPublicacao?.toString() || "",
        livro.autor?.nome || livro.autorNome || "",
        livro.editora?.nome || livro.editoraNome || "",
        livro.genero?.nome || livro.generoSigla || livro.genero || "",
      ].join(" ");

      return normalizarTexto(valoresParaBuscar).includes(termoBusca);
    });
  }, [livros, busca]);

  return (
    <main className="main-container container">
      <h1 className="page-title fonte-rye">Listagem de Livros</h1>

      <p className="page-subtitle">
        Consulte os livros cadastrados no sistema da biblioteca.
      </p>

      <div className="mb-4">
        <Input
          type="search"
          placeholder="Filtrar por título, autor, editora, gênero, ISBN ou ano"
          value={busca}
          onChange={(event) => setBusca(event.target.value)}
        />
      </div>

      {loading ? (
        <p className="text-center">Carregando livros...</p>
      ) : erro ? (
        <div className="alert alert-danger text-center">{erro}</div>
      ) : livros.length === 0 ? (
        <div className="alert alert-warning text-center">
          Nenhum livro foi encontrado na API.
        </div>
      ) : livrosFiltrados.length === 0 ? (
        <div className="alert alert-warning text-center">
          Nenhum livro encontrado com esse filtro.
        </div>
      ) : (
        <div className="row g-4">
          {livrosFiltrados.map((livro) => (
            <CardLivro key={livro.id} livro={livro} />
          ))}
        </div>
      )}
    </main>
  );
}
