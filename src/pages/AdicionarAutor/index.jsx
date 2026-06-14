import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { criarAutor } from "../../service/api";
import Input from "../../components/Input";

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
        <h1 className="formulario-titulo">Adicionar Novo Autor</h1>

        {erroAPI && <div className="alert alert-danger">{erroAPI}</div>}
        {sucesso && <div className="alert alert-success">{sucesso}</div>}

        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Nome do Autor"
            placeholder="Ex: João da Silva"
            error={errors.nome?.message}
            {...register("nome", {
              required: "O nome é obrigatório",
            })}
          />

          <Input
            label="Nacionalidade"
            placeholder="Ex: Brasileiro"
            error={errors.nacionalidade?.message}
            {...register("nacionalidade", {
              required: "A nacionalidade é obrigatória",
            })}
          />

          <Input
            label="Data de Nascimento"
            type="date"
            error={errors.dataNascimento?.message}
            {...register("dataNascimento", {
              required: "A data de nascimento é obrigatória",
            })}
          />

          <button type="submit" className="btn btn-marrom btn-formulario">
            Guardar Autor
          </button>
        </form>
      </section>
    </main>
  );
}
