import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { criarEditora } from "../../service/api";
import Input from "../../components/Input";
import { EstadosBrasileiros } from "./EstadosBrasileiros";
import Select from "../../components/Select";

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

  async function onSubmit(dadosDoFormulario) {
    setErroAPI("");
    setSucesso("");

    try {
      await criarEditora(dadosDoFormulario);
      setSucesso("Editora cadastrada com sucesso!");
      reset();
      setTimeout(() => navigate("/livros/adicionar"), 2000);
    } catch (erro) {
      setErroAPI(
        erro.response?.data?.message ||
          erro.response?.data?.erros?.[0] ||
          erro.response?.data,
      );
    }
  }

  return (
    <main className="pagina-formulario">
      <section className="formulario-card">
        <h1 className="formulario-titulo">Adicionar Nova Editora</h1>

        {erroAPI && <div className="alert alert-danger">{erroAPI}</div>}

        {sucesso && <div className="alert alert-success">{sucesso}</div>}

        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Nome da Editora"
            placeholder="Ex: Editora Vozes"
            error={errors.nome?.message}
            {...register("nome", {
              required: "O nome da editora é obrigatório",
            })}
          />

          <Input
            label="CNPJ"
            placeholder="00.000.000/0000-00"
            error={errors.cnpj?.message}
            {...register("cnpj", {
              required: "O CNPJ é obrigatório",
            })}
          />

          <Select
            label="Estado (UF)"
            defaultOption="Selecione o Estado..."
            error={errors.estado?.message}
            options={EstadosBrasileiros.map((uf) => ({ value: uf, label: uf }))}
            {...register("estado", {
              required: "Selecione o estado da editora",
            })}
          />

          <button type="submit" className="btn btn-marrom btn-formulario">
            Guardar Editora
          </button>
        </form>
      </section>
    </main>
  );
}
