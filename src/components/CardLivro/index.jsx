import { Link } from "react-router-dom";

export default function CardLivro(props) {
  const livro = props.livro;

  return (
    <div className="col-md-4">
      <div className="card card-livro shadow-sm h-100">
        <div className="card-body">
          <h5 className="card-title">{livro.titulo}</h5>

          <p className="card-text mb-1">
            <strong>ISBN:</strong> {livro.isbn || "Não informado"}
          </p>

          <p className="card-text mb-1">
            <strong>Ano:</strong> {livro.anoPublicacao || "Não informado"}
          </p>

          <p className="card-text mb-1">
            <strong>Autor:</strong>{" "}
            {livro.autor?.nome || livro.autor || "Não informado"}
          </p>

          <p className="card-text mb-1">
            <strong>Editora:</strong>{" "}
            {livro.editora?.nome || livro.editora || "Não informado"}
          </p>

          <p className="card-text">
            <strong>Gênero:</strong>{" "}
            {livro.genero?.nome || livro.genero || "Não informado"}
          </p>

          <Link
            to={`/livros/editar/${livro.id}`}
            className="btn btn-marrom w-100 mt-2"
          >
            Editar livro
          </Link>
        </div>
      </div>
    </div>
  );
}
