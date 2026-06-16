import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { criarLivro } from "../../service/api";
import { useListasAuxiliares } from "../../hooks/useListasAuxiliares"; // Central de dados
import Input from "../../components/Input";
import Select from "../../components/Select";

export default function AdicionarLivro() {
  const navigate = useNavigate();
  const [erroAPI, setErroAPI] = useState("");
  const [sucesso, setSucesso] = useState("");

  const { autores, editoras, generos, carregandoListas } =
    useListasAuxiliares();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  async function onSubmit(dados) {
    setErroAPI("");
    setSucesso("");

    try {
      await criarLivro(dados);
      setSucesso("Livro adicionado com sucesso!");
      reset();
      setTimeout(() => navigate("/home"), 2000);
    } catch {
      setErroAPI("Erro ao comunicar com a API. Tente novamente.");
    }
  }

  if (carregandoListas)
    return <p className="text-center mt-5">Carregando formulário...</p>;

  return (
    <main className="pagina-formulario container mt-4">
      <section
        className="formulario-card formulario-card-livro shadow-sm p-4 rounded bg-white mx-auto"
        style={{ maxWidth: "800px" }}
      >
        <h1 className="formulario-titulo mb-4">Adicionar Novo Livro</h1>

        {erroAPI && (
          <div className="alert alert-danger" role="alert">
            {erroAPI}
          </div>
        )}
        {sucesso && (
          <div className="alert alert-success" role="alert">
            {sucesso}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Título do Livro"
            placeholder="Ex: O Senhor dos Anéis"
            error={errors.titulo?.message}
            {...register("titulo", { required: "O título é obrigatório" })}
          />

          <div className="row mb-3">
            <div className="col-md-6">
              <Input
                label="ISBN"
                placeholder="Ex: 978-3-16-148410-0"
                error={errors.isbn?.message}
                {...register("isbn", { required: "O ISBN é obrigatório" })}
              />
            </div>
            <div className="col-md-6">
              <Input
                label="Ano de Publicação"
                type="number"
                placeholder="Ex: 1954"
                error={errors.anoPublicacao?.message}
                {...register("anoPublicacao", {
                  required: "O ano é obrigatório",
                  valueAsNumber: true,
                })}
              />
            </div>
          </div>

          <Select
            label="Gênero"
            defaultOption="Selecione um gênero..."
            error={errors.generoId?.message}
            options={generos.map((g) => ({
              value: g.id,
              label: `${g.nome} (${g.sigla})`,
            }))}
            {...register("generoId", {
              required: "Selecione um gênero",
              valueAsNumber: true,
            })}
          />

          <div className="mb-3">
            <Select
              label="Autor"
              defaultOption="Selecione um autor..."
              error={errors.autorId?.message}
              options={autores.map((a) => ({ value: a.id, label: a.nome }))}
              {...register("autorId", {
                required: "Selecione um autor",
                valueAsNumber: true,
              })}
            />
            <Link
              to="/autores/adicionar"
              className="btn btn-outline-secondary mt-2"
            >
              Cadastrar novo autor
            </Link>
          </div>

          <div className="mb-3">
            <Select
              label="Editora"
              defaultOption="Selecione uma editora..."
              error={errors.editoraId?.message}
              options={editoras.map((e) => ({ value: e.id, label: e.nome }))}
              {...register("editoraId", {
                required: "Selecione uma editora",
                valueAsNumber: true,
              })}
            />
            <Link
              to="/editoras/adicionar"
              className="btn btn-outline-secondary mt-2"
            >
              Cadastrar nova editora
            </Link>
          </div>

          <button
            type="submit"
            className="btn btn-marrom w-100 mt-4"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Guardando..." : "Guardar Livro"}
          </button>
        </form>
      </section>
    </main>
  );
}
