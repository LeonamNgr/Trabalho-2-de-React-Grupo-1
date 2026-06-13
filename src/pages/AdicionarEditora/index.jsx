import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { criarEditora } from "../../service/api";

export default function AdicionarEditora() {
  const navigate = useNavigate();
  const [erroAPI, setErroAPI] = useState("");
  const [sucesso, setSucesso] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const estadosBrasileiros = [
    "AC",
    "AL",
    "AP",
    "AM",
    "BA",
    "CE",
    "DF",
    "ES",
    "GO",
    "MA",
    "MT",
    "MS",
    "MG",
    "PA",
    "PB",
    "PR",
    "PE",
    "PI",
    "RJ",
    "RN",
    "RS",
    "RO",
    "RR",
    "SC",
    "SP",
    "SE",
    "TO",
  ];

  async function onSubmit(dadosDoFormulario) {
    setErroAPI("");
    setSucesso("");

    try {
      await criarEditora(dadosDoFormulario);
      setSucesso("Editora cadastrada com sucesso!");
      reset();
      setTimeout(() => navigate("/livros/adicionar"), 2000);
    } catch {
      setErroAPI("Verifique os dados da editora!");
    }
  }

  return (
    <main className="pagina-formulario">
      <section className="formulario-card">
        <h1 className="formulario-titulo">Adicionar Nova Editora</h1>

        {erroAPI && <div className="alert alert-danger">{erroAPI}</div>}

        {sucesso && <div className="alert alert-success">{sucesso}</div>}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label">Nome da Editora</label>

            <input
              type="text"
              className={`form-control ${errors.nome ? "is-invalid" : ""}`}
              placeholder="Ex: Editora Vozes"
              {...register("nome", {
                required: "O nome da editora é obrigatório",
              })}
            />

            {errors.nome && (
              <span className="invalid-feedback">{errors.nome.message}</span>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">CNPJ</label>

            <input
              type="text"
              className={`form-control ${errors.cnpj ? "is-invalid" : ""}`}
              placeholder="00.000.000/0000-00"
              {...register("cnpj", {
                required: "O CNPJ é obrigatório",
              })}
            />

            {errors.cnpj && (
              <span className="invalid-feedback">{errors.cnpj.message}</span>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">Estado (UF)</label>

            <select
              className={`form-select ${errors.estado ? "is-invalid" : ""}`}
              {...register("estado", {
                required: "Selecione o estado da editora",
              })}
            >
              <option value="">Selecione o Estado...</option>

              {estadosBrasileiros.map((uf) => (
                <option key={uf} value={uf}>
                  {uf}
                </option>
              ))}
            </select>

            {errors.estado && (
              <span className="invalid-feedback">{errors.estado.message}</span>
            )}
          </div>

          <button type="submit" className="btn btn-marrom btn-formulario">
            Guardar Editora
          </button>
        </form>
      </section>
    </main>
  );
}
