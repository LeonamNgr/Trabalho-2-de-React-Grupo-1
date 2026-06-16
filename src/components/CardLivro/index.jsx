import { Link } from "react-router-dom";

const InfoLinha = ({ label, valor }) => (
  <p className="card-text mb-1">
    <strong>{label}: </strong>
    {valor || "Não informado"}
  </p>
);

export default function CardLivro({ livro }) {
  if (!livro) return null;

  return (
    <div className="col-md-4 mb-4">
      <div className="card card-livro shadow-sm h-100">
        <div className="card-body d-flex flex-column">
          <h5 className="card-title text-center mb-3">{livro.titulo}</h5>

          <div className="flex-grow-1">
            <InfoLinha label="ISBN" valor={livro.isbn} />
            <InfoLinha label="Ano" valor={livro.anoPublicacao} />
            <InfoLinha label="Autor" valor={livro.autorNome} />
            <InfoLinha label="Editora" valor={livro.editoraNome} />
            <InfoLinha label="Gênero" valor={livro.generoSigla} />
          </div>

          <Link
            to={`/livros/editar/${livro.id}`}
            className="btn btn-marrom w-100 mt-3"
          >
            Editar livro
          </Link>
        </div>
      </div>
    </div>
  );
}
