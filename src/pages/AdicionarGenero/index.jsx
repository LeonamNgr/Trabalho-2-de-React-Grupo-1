import { useState } from "react";
import { useForm } from "react-hook-form";
import { criarGenero } from "../../service/api";

export default function AdicionarGenero() {
  const [erroAPI, setErroAPI] = useState("");
  const [sucesso, setSucesso] = useState("");
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  
  const siglasPermitidas = ["ROM", "DRM", "FIC", "TER", "BIO"];

  async function onSubmit(dados) {
    setErroAPI(""); setSucesso("");
    try {
      await criarGenero(dados);
      setSucesso("Género criado com sucesso!");
      reset();
    } catch {
      setErroAPI("Erro ao tentar adicionar o género.");
    }
  }

  return (
    <div className="container mt-5">
      <div className="card shadow p-4 mx-auto" style={{ maxWidth: "500px" }}>
        <h2 className="text-center mb-4">Adicionar Novo Género</h2>
        {erroAPI && <div className="alert alert-danger">{erroAPI}</div>}
        {sucesso && <div className="alert alert-success">{sucesso}</div>}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label fw-bold">Nome do Género</label>
            <input
              type="text"
              className={`form-control ${errors.nome ? "is-invalid" : ""}`}
              placeholder="Ex: Ficção Científica"
              {...register("nome", { required: "O nome é obrigatório" })}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Sigla</label>
            <select
              className={`form-select ${errors.sigla ? "is-invalid" : ""}`}
              {...register("sigla", { required: "Selecione uma sigla válida" })}
            >
              <option value="">Selecione a Sigla...</option>
              {siglasPermitidas.map((sigla) => (
                <option key={sigla} value={sigla}>{sigla}</option>
              ))}
            </select>
          </div>

          <button type="submit" className="btn btn-primary w-100 mt-3 fw-bold">Guardar Género</button>
        </form>
      </div>
    </div>
  );
}