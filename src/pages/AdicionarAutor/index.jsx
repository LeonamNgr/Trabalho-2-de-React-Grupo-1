import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { criarAutor } from "../../service/api";

export default function AdicionarAutor() {
  const navigate = useNavigate();
  const [erroAPI, setErroAPI] = useState("");
  const [sucesso, setSucesso] = useState("");
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  async function onSubmit(dadosDoFormulario) {
    setErroAPI("");
    setSucesso("");

    try {
      await criarAutor(dadosDoFormulario);
      setSucesso("Autor cadastrado com sucesso!");
      reset();
      
     
      setTimeout(() => navigate("/livros/adicionar"), 2000);
    } catch {
      setErroAPI("Erro ao comunicar com a API. Tente novamente.");
    }
  }

  return (
    <div className="container mt-5">
      <div className="card shadow p-4 mx-auto" style={{ maxWidth: "500px" }}>
        <h2 className="text-center mb-4">Adicionar Novo Autor</h2>

        {erroAPI && <div className="alert alert-danger">{erroAPI}</div>}
        {sucesso && <div className="alert alert-success">{sucesso}</div>}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label fw-bold">Nome do Autor</label>
            <input
              type="text"
              className={`form-control ${errors.nome ? "is-invalid" : ""}`}
              placeholder="Ex: João da Silva"
              {...register("nome", { required: "O nome é obrigatório" })}
            />
            {errors.nome && (
              <span className="invalid-feedback">{errors.nome.message}</span>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Nacionalidade</label>
            <input
              type="text"
              className={`form-control ${errors.nacionalidade ? "is-invalid" : ""}`}
              placeholder="Ex: Brasileiro"
              {...register("nacionalidade", { required: "A nacionalidade é obrigatória" })}
            />
            {errors.nacionalidade && (
              <span className="invalid-feedback">{errors.nacionalidade.message}</span>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Data de Nascimento</label>
            <input
              type="date"
              className={`form-control ${errors.dataNascimento ? "is-invalid" : ""}`}
              {...register("dataNascimento", { required: "A data de nascimento é obrigatória" })}
            />
            {errors.dataNascimento && (
              <span className="invalid-feedback">{errors.dataNascimento.message}</span>
            )}
          </div>

          <button type="submit" className="btn btn-primary w-100 mt-3 fw-bold">
            Guardar Autor
          </button>
        </form>
      </div>
    </div>
  );
}