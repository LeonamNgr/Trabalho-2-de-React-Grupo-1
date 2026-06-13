import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import {
  atualizarLivro,
  buscarLivroPorId,
  buscarTodasAsEditoras,
  buscarTodosOsAutores,
  buscarTodosOsGeneros,
  deletarLivro,
  extrairMensagemErro,
} from "../../service/api";

export default function EditarLivro() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [autores, setAutores] = useState([]);
  const [editoras, setEditoras] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [apagando, setApagando] = useState(false);
  const [erroAPI, setErroAPI] = useState("");
  const [sucesso, setSucesso] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  useEffect(() => {
    async function carregarDados() {
      try {
        const [livro, dadosAutores, dadosEditoras, dadosGeneros] =
          await Promise.all([
            buscarLivroPorId(id),
            buscarTodosOsAutores(),
            buscarTodasAsEditoras(),
            buscarTodosOsGeneros(),
          ]);

        setAutores(dadosAutores);
        setEditoras(dadosEditoras);
        setGeneros(dadosGeneros);

        reset({
          titulo: livro.titulo ?? "",
          isbn: livro.isbn ?? "",
          anoPublicacao: livro.anoPublicacao ?? "",
          autorId: String(livro.autorId ?? ""),
          editoraId: String(livro.editoraId ?? ""),
          generoId: String(livro.generoId ?? ""),
        });
      } catch (error) {
        setErroAPI(
          extrairMensagemErro(
            error,
            "Não foi possível carregar os dados do livro.",
          ),
        );
      } finally {
        setCarregando(false);
      }
    }

    carregarDados();
  }, [id, reset]);

  async function onSubmit(dados) {
    setErroAPI("");
    setSucesso("");

    const livro = {
      titulo: dados.titulo.trim(),
      isbn: dados.isbn.trim() || null,
      anoPublicacao: dados.anoPublicacao
        ? Number(dados.anoPublicacao)
        : null,
      generoId: Number(dados.generoId),
      autorId: Number(dados.autorId),
      editoraId: Number(dados.editoraId),
    };

    try {
      await atualizarLivro(id, livro);
      setSucesso("Livro atualizado com sucesso!");

      setTimeout(() => {
        navigate("/livros");
      }, 1200);
    } catch (error) {
      setErroAPI(
        extrairMensagemErro(
          error,
          "Não foi possível atualizar o livro.",
        ),
      );
    }
  }

  async function apagarLivro() {
    const confirmou = window.confirm(
      "Tem certeza que deseja apagar este livro?",
    );

    if (!confirmou) {
      return;
    }

    setErroAPI("");
    setSucesso("");
    setApagando(true);

    try {
      await deletarLivro(id);
      setSucesso("Livro apagado com sucesso!");

      setTimeout(() => {
        navigate("/livros");
      }, 1200);
    } catch (error) {
      setErroAPI(
        extrairMensagemErro(
          error,
          "Não foi possível apagar o livro.",
        ),
      );
    } finally {
      setApagando(false);
    }
  }

  return (
    <main className="main-container container">
      <div className="card shadow p-4 mx-auto form-card">
        <h1 className="page-title">Editar livro</h1>

        {erroAPI && (
          <div className="alert alert-danger">{erroAPI}</div>
        )}

        {sucesso && (
          <div className="alert alert-success">{sucesso}</div>
        )}

        {carregando ? (
          <p className="text-center">Carregando livro...</p>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Título</label>
              <input
                type="text"
                maxLength="60"
                className={`form-control ${
                  errors.titulo ? "is-invalid" : ""
                }`}
                {...register("titulo", {
                  required: "O título é obrigatório.",
                  maxLength: {
                    value: 60,
                    message: "O título pode ter no máximo 60 caracteres.",
                  },
                })}
              />
              {errors.titulo && (
                <span className="invalid-feedback">
                  {errors.titulo.message}
                </span>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">ISBN</label>
              <input
                type="text"
                maxLength="17"
                className={`form-control ${
                  errors.isbn ? "is-invalid" : ""
                }`}
                {...register("isbn", {
                  maxLength: {
                    value: 17,
                    message: "O ISBN pode ter no máximo 17 caracteres.",
                  },
                })}
              />
              {errors.isbn && (
                <span className="invalid-feedback">
                  {errors.isbn.message}
                </span>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">
                Ano de publicação
              </label>
              <input
                type="number"
                min="0"
                max="2100"
                className="form-control"
                {...register("anoPublicacao")}
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Autor</label>
              <select
                className={`form-select ${
                  errors.autorId ? "is-invalid" : ""
                }`}
                {...register("autorId", {
                  required: "Selecione um autor.",
                })}
              >
                <option value="">Selecione</option>
                {autores.map((autor) => (
                  <option key={autor.id} value={autor.id}>
                    {autor.nome}
                  </option>
                ))}
              </select>
              {errors.autorId && (
                <span className="invalid-feedback">
                  {errors.autorId.message}
                </span>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Editora</label>
              <select
                className={`form-select ${
                  errors.editoraId ? "is-invalid" : ""
                }`}
                {...register("editoraId", {
                  required: "Selecione uma editora.",
                })}
              >
                <option value="">Selecione</option>
                {editoras.map((editora) => (
                  <option key={editora.id} value={editora.id}>
                    {editora.nome}
                  </option>
                ))}
              </select>
              {errors.editoraId && (
                <span className="invalid-feedback">
                  {errors.editoraId.message}
                </span>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Gênero</label>
              <select
                className={`form-select ${
                  errors.generoId ? "is-invalid" : ""
                }`}
                {...register("generoId", {
                  required: "Selecione um gênero.",
                })}
              >
                <option value="">Selecione</option>
                {generos.map((genero) => (
                  <option key={genero.id} value={genero.id}>
                    {genero.nome} ({genero.sigla})
                  </option>
                ))}
              </select>
              {errors.generoId && (
                <span className="invalid-feedback">
                  {errors.generoId.message}
                </span>
              )}
            </div>

            <div className="d-flex gap-2">
              <button
                type="submit"
                className="btn btn-marrom flex-grow-1"
                disabled={isSubmitting || apagando}
              >
                {isSubmitting ? "Salvando..." : "Salvar alterações"}
              </button>

              <button
                type="button"
                className="btn btn-danger"
                onClick={apagarLivro}
                disabled={isSubmitting || apagando}
              >
                {apagando ? "Apagando..." : "Apagar"}
              </button>
            </div>
          </form>
        )}
      </div>
    </main>
  );
}
