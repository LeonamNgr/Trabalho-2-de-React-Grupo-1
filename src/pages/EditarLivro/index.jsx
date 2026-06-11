import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  buscarLivroPorId,
  atualizarLivro,
  deletarLivro,
} from "../../service/api";

export default function EditarLivro() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [erroAPI, setErroAPI] = useState("");
  const [sucesso, setSucesso] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  async function carregarLivro() {
    try {
      const livro = await buscarLivroPorId(id);

      reset({
        titulo: livro.titulo,
        autor: livro.autor?.nome || livro.autor,
        editora: livro.editora?.nome || livro.editora,
      });
    } catch {
      setErroAPI("Não foi possível carregar os dados deste livro.");
    }
  }

  useEffect(() => {
    carregarLivro();
  }, [id, reset]);

  async function onSubmit(dadosDoFormulario) {
    setErroAPI("");
    setSucesso("");

    try {
      await atualizarLivro(id, dadosDoFormulario);
      setSucesso("Livro atualizado com sucesso!");
      setTimeout(() => navigate("/"), 2000);
    } catch {
      setErroAPI("Erro ao tentar atualizar o livro.");
    }
  }

  async function apagarLivro() {
    const confirmar = window.confirm(
      "Tem certeza que deseja apagar este livro?",
    );

    if (confirmar) {
      try {
        await deletarLivro(id);
        setSucesso("Livro apagado com sucesso!");
        setTimeout(() => navigate("/"), 2000);
      } catch {
        setErroAPI("Erro ao tentar apagar o livro.");
      }
    }
  }

  return (
    <div className="container mt-5">
      <div className="card shadow p-4 mx-auto" style={{ maxWidth: "500px" }}>
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
            {errors.titulo && (
              <span className="invalid-feedback">{errors.titulo.message}</span>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Autor</label>
            <input
              type="text"
              className={`form-control ${errors.autor ? "is-invalid" : ""}`}
              {...register("autor", { required: "O autor é obrigatório" })}
            />
            {errors.autor && (
              <span className="invalid-feedback">{errors.autor.message}</span>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Editora</label>
            <input
              type="text"
              className={`form-control ${errors.editora ? "is-invalid" : ""}`}
              {...register("editora", { required: "A editora é obrigatória" })}
            />
            {errors.editora && (
              <span className="invalid-feedback">{errors.editora.message}</span>
            )}
          </div>

          <div className="d-flex justify-content-between mt-4">
            <button type="submit" className="btn btn-primary w-50 me-2 fw-bold">
              Salvar Alterações
            </button>
            <button
              type="button"
              onClick={apagarLivro}
              className="btn btn-danger w-50 ms-2 fw-bold"
            >
              Apagar Livro
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
