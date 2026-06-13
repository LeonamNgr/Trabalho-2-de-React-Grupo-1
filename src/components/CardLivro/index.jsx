import { Link } from "react-router-dom";

export default function CardLivro({ livro }) {
  return (
    <div className="col-sm-6 col-lg-4">
      <article className="card card-livro shadow-sm h-100">
        <div className="card-body d-flex flex-column">
          <h2 className="h5 card-title">{livro.titulo}</h2>

          <p className="card-text mb-1">
            <strong>ISBN:</strong> {livro.isbn || "Não informado"}
          </p>

          <p className="card-text mb-1">
            <strong>Ano:</strong>{" "}
            {livro.anoPublicacao || "Não informado"}
          </p>

          <p className="card-text mb-1">
            <strong>Autor:</strong>{" "}
            {livro.autorNome || "Não informado"}
          </p>

          <p className="card-text mb-1">
            <strong>Editora:</strong>{" "}
            {livro.editoraNome || "Não informado"}
          </p>

          <p className="card-text mb-3">
            <strong>Gênero:</strong>{" "}
            {livro.generoSigla || "Não informado"}
          </p>

          <Link
            to={`/livros/editar/${livro.id}`}
            className="btn btn-marrom w-100 mt-auto"
          >
            Editar livro
          </Link>
        </div>
      </article>
    </div>
  );
}
