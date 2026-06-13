import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import {
  buscarLivroPorId,
  extrairMensagemErro,
} from "../../service/api";

export default function BuscarLivro() {
  const [livro, setLivro] = useState(null);
  const [erroAPI, setErroAPI] = useState("");
  const [carregando, setCarregando] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function onSubmit(dados) {
    setErroAPI("");
    setLivro(null);
    setCarregando(true);

    try {
      const resultado = await buscarLivroPorId(dados.idLivro);
      setLivro(resultado);
    } catch (error) {
      setErroAPI(
        extrairMensagemErro(
          error,
          "Livro não encontrado. Verifique o ID informado.",
        ),
      );
    } finally {
      setCarregando(false);
    }
  }

  return (
    <main className="main-container container">
      <div className="card shadow p-4 mx-auto form-card">
        <h1 className="page-title">Buscar livro por ID</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
          <label htmlFor="idLivro" className="form-label fw-semibold">
            ID do livro
          </label>

          <div className="d-flex gap-2">
            <div className="flex-grow-1">
              <input
                id="idLivro"
                type="number"
                min="1"
                className={`form-control ${
                  errors.idLivro ? "is-invalid" : ""
                }`}
                placeholder="Exemplo: 1"
                {...register("idLivro", {
                  required: "Informe o ID do livro.",
                  min: {
                    value: 1,
                    message: "O ID deve ser maior que zero.",
                  },
                })}
              />

              {errors.idLivro && (
                <span className="invalid-feedback">
                  {errors.idLivro.message}
                </span>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-marrom"
              disabled={carregando}
            >
              {carregando ? "Buscando..." : "Pesquisar"}
            </button>
          </div>
        </form>

        {erroAPI && (
          <div className="alert alert-danger text-center">
            {erroAPI}
          </div>
        )}

        {livro && (
          <article className="card border-0 shadow-sm">
            <div className="card-body">
              <h2 className="h4">{livro.titulo}</h2>

              <p><strong>ID:</strong> {livro.id}</p>
              <p><strong>ISBN:</strong> {livro.isbn || "Não informado"}</p>
              <p><strong>Ano:</strong> {livro.anoPublicacao || "Não informado"}</p>
              <p><strong>Autor:</strong> {livro.autorNome || "Não informado"}</p>
              <p><strong>Editora:</strong> {livro.editoraNome || "Não informado"}</p>
              <p><strong>Gênero:</strong> {livro.generoSigla || "Não informado"}</p>

              <Link
                to={`/livros/editar/${livro.id}`}
                className="btn btn-marrom w-100"
              >
                Editar este livro
              </Link>
            </div>
          </article>
        )}
      </div>
    </main>
  );
}
