import { useState } from "react";
import { useForm } from "react-hook-form";
import { criarGenero } from "../../service/api";

export default function AdicionarGenero() {
  const [erroAPI, setErroAPI] = useState("");
  const [sucesso, setSucesso] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  async function onSubmit(dados) {
    setErroAPI("");
    setSucesso("");

    try {
      await criarGenero(dados);
      setSucesso("Gênero criado com sucesso!");
      reset();
    } catch {
      setErroAPI("Erro ao tentar adicionar o gênero.");
    }
  }

  return (
    <main className="pagina-formulario">
      <section className="formulario-card">
        <h1 className="formulario-titulo">Adicionar Novo Gênero</h1>

        {erroAPI && <div className="alert alert-danger">{erroAPI}</div>}

        {sucesso && <div className="alert alert-success">{sucesso}</div>}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label">Nome do Gênero</label>

            <input
              type="text"
              className={`form-control ${errors.nome ? "is-invalid" : ""}`}
              placeholder="Ex: Ficção Científica"
              {...register("nome", {
                required: "O nome é obrigatório",
              })}
            />

            {errors.nome && (
              <span className="invalid-feedback">{errors.nome.message}</span>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">Sigla</label>

            <input
              type="text"
              className={`form-control ${errors.sigla ? "is-invalid" : ""}`}
              placeholder="Ex: FIC"
              maxLength={3}
              {...register("sigla", {
                required: "A sigla é obrigatória",
                minLength: {
                  value: 3,
                  message: "A sigla deve ter 3 letras",
                },
                maxLength: {
                  value: 3,
                  message: "A sigla deve ter 3 letras",
                },
                setValueAs: (valor) => valor.trim().toUpperCase(),
              })}
            />

            {errors.sigla && (
              <span className="invalid-feedback">{errors.sigla.message}</span>
            )}
          </div>

          <button type="submit" className="btn btn-marrom btn-formulario">
            Guardar Gênero
          </button>
        </form>
      </section>
    </main>
  );
}
