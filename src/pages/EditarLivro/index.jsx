import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  buscarLivroPorId,
  atualizarLivro,
  deletarLivro,
  buscarAutores,
  buscarEditoras,
  buscarGeneros
} from "../../service/api";

export default function EditarLivro() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [erroAPI, setErroAPI] = useState("");
  const [sucesso, setSucesso] = useState("");

  // Listas para popular os selects
  const [autores, setAutores] = useState([]);
  const [editoras, setEditoras] = useState([]);
  const [generos, setGeneros] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    async function carregarDados() {
      try {
        // Busca os dados do livro E as listas simultaneamente
        const [livro, listaAutores, listaEditoras, listaGeneros] = await Promise.all([
          buscarLivroPorId(id),
          buscarAutores(),
          buscarEditoras(),
          buscarGeneros()
        ]);

        setAutores(listaAutores);
        setEditoras(listaEditoras);
        setGeneros(listaGeneros);

        
        reset({
          titulo: livro.titulo || "",
          isbn: livro.isbn || "",
          anoPublicacao: livro.anoPublicacao || "",
          generoId: livro.genero?.id || livro.generoId || "",
          autorId: livro.autor?.id || livro.autorId || "",
          editoraId: livro.editora?.id || livro.editoraId || "",
        });
      } catch {
        setErroAPI("Não foi possível carregar os dados completos deste livro.");
      }
    }

    carregarDados();
  }, [id, reset]);

  async function onSubmit(dadosDoFormulario) {
    setErroAPI("");
    setSucesso("");

    try {
      await atualizarLivro(id, dadosDoFormulario);
      setSucesso("Livro atualizado com sucesso!");
      setTimeout(() => navigate("/home"), 2000);
    } catch {
      setErroAPI("Erro ao tentar atualizar o livro.");
    }
  }

  async function apagarLivro() {
    const confirmar = window.confirm("Tem certeza que deseja apagar este livro?");

    if (confirmar) {
      try {
        await deletarLivro(id);
        setSucesso("Livro apagado com sucesso!");
        setTimeout(() => navigate("/home"), 2000);
      } catch {
        setErroAPI("Erro ao tentar apagar o livro.");
      }
    }
  }

  return (
    <div className="container mt-5">
      <div className="card shadow p-4 mx-auto" style={{ maxWidth: "600px" }}>
        <h2 className="text-center mb-4">Editar Livro</h2>

        {erroAPI && <div className="alert alert-danger">{erroAPI}</div>}
        {sucesso && <div className="alert alert-success">{sucesso}</div>}

        <form onSubmit={handleSubmit(onSubmit)}>
          
          <div className="mb-3">
            <label className="form-label fw-bold">Título do Livro</label>
            <input
              type="text"
              className={`form-control ${errors.titulo ? "is-invalid" : ""}`}
              {...register("titulo", { required: "O título é obrigatório" })}
            />
            {errors.titulo && <span className="invalid-feedback">{errors.titulo.message}</span>}
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label fw-bold">ISBN</label>
              <input
                type="text"
                className={`form-control ${errors.isbn ? "is-invalid" : ""}`}
                {...register("isbn", { required: "O ISBN é obrigatório" })}
              />
              {errors.isbn && <span className="invalid-feedback">{errors.isbn.message}</span>}
            </div>

            <div className="col-md-6">
              <label className="form-label fw-bold">Ano de Publicação</label>
              <input
                type="number"
                className={`form-control ${errors.anoPublicacao ? "is-invalid" : ""}`}
                {...register("anoPublicacao", { 
                  required: "O ano é obrigatório",
                  valueAsNumber: true 
                })}
              />
              {errors.anoPublicacao && <span className="invalid-feedback">{errors.anoPublicacao.message}</span>}
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Gênero</label>
            <select
              className={`form-select ${errors.generoId ? "is-invalid" : ""}`}
              {...register("generoId", { 
                required: "Selecione um gênero",
                valueAsNumber: true 
              })}
            >
              <option value="">Selecione um gênero...</option>
              {generos.map((genero) => (
                <option key={genero.id} value={genero.id}>
                  {genero.nome} ({genero.sigla})
                </option>
              ))}
            </select>
            {errors.generoId && <span className="invalid-feedback">{errors.generoId.message}</span>}
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Autor</label>
            <select
              className={`form-select ${errors.autorId ? "is-invalid" : ""}`}
              {...register("autorId", { 
                required: "Selecione um autor",
                valueAsNumber: true 
              })}
            >
              <option value="">Selecione um autor...</option>
              {autores.map((autor) => (
                <option key={autor.id} value={autor.id}>
                  {autor.nome}
                </option>
              ))}
            </select>
            {errors.autorId && <span className="invalid-feedback">{errors.autorId.message}</span>}
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Editora</label>
            <select
              className={`form-select ${errors.editoraId ? "is-invalid" : ""}`}
              {...register("editoraId", { 
                required: "Selecione uma editora",
                valueAsNumber: true 
              })}
            >
              <option value="">Selecione uma editora...</option>
              {editoras.map((editora) => (
                <option key={editora.id} value={editora.id}>
                  {editora.nome}
                </option>
              ))}
            </select>
            {errors.editoraId && <span className="invalid-feedback">{errors.editoraId.message}</span>}
          </div>

          <div className="d-flex justify-content-between mt-4">
            <button type="submit" className="btn btn-primary w-50 me-2 fw-bold">
              Salvar Alterações
            </button>
            <button type="button" onClick={apagarLivro} className="btn btn-danger w-50 ms-2 fw-bold">
              Apagar Livro
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}