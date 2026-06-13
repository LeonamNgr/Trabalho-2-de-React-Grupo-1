import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  buscarTodasAsEditoras,
  buscarTodosOsAutores,
  buscarTodosOsGeneros,
  criarLivro,
  extrairMensagemErro,
} from "../../service/api";

export default function AdicionarLivro() {
  const navigate = useNavigate();
  const [autores, setAutores] = useState([]);
  const [editoras, setEditoras] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [carregandoOpcoes, setCarregandoOpcoes] = useState(true);
  const [erroAPI, setErroAPI] = useState("");
  const [sucesso, setSucesso] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  useEffect(() => {
    async function carregarOpcoes() {
      try {
        const [dadosAutores, dadosEditoras, dadosGeneros] =
          await Promise.all([
            buscarTodosOsAutores(),
            buscarTodasAsEditoras(),
            buscarTodosOsGeneros(),
          ]);

        setAutores(dadosAutores);
        setEditoras(dadosEditoras);
        setGeneros(dadosGeneros);
      } catch (error) {
        setErroAPI(
          extrairMensagemErro(
            error,
            "Não foi possível carregar autores, editoras e gêneros.",
          ),
        );
      } finally {
        setCarregandoOpcoes(false);
      }
    }

    carregarOpcoes();
  }, []);

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
      await criarLivro(livro);
      setSucesso("Livro adicionado com sucesso!");
      reset();

      setTimeout(() => {
        navigate("/livros");
      }, 1200);
    } catch (error) {
      setErroAPI(
        extrairMensagemErro(
          error,
          "Não foi possível adicionar o livro.",
        ),
      );
    }
  }

  return (
    <main className="main-container container">
      <div className="card shadow p-4 mx-auto form-card">
        <h1 className="page-title">Adicionar novo livro</h1>

        {erroAPI && (
          <div className="alert alert-danger">{erroAPI}</div>
        )}

        {sucesso && (
          <div className="alert alert-success">{sucesso}</div>
        )}

        {carregandoOpcoes ? (
          <p className="text-center">Carregando opções...</p>
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
                placeholder="978-85-359-0277-8"
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
                defaultValue=""
                {...register("autorId", {
                  required: "Selecione um autor.",
                })}
              >
                <option value="" disabled>Selecione</option>
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
                defaultValue=""
                {...register("editoraId", {
                  required: "Selecione uma editora.",
                })}
              >
                <option value="" disabled>Selecione</option>
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
                defaultValue=""
                {...register("generoId", {
                  required: "Selecione um gênero.",
                })}
              >
                <option value="" disabled>Selecione</option>
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

            <button
              type="submit"
              className="btn btn-marrom w-100"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Salvando..." : "Cadastrar livro"}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
