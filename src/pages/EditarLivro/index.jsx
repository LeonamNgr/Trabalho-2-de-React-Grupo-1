import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  buscarLivroPorId,
  atualizarLivro,
  deletarLivro,
} from "../../service/api";
import { useListasAuxiliares } from "../../hooks/useListasAuxiliares";
import Input from "../../components/Input";
import Select from "../../components/Select";

export default function EditarLivro() {
  const { id } = useParams();
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

  useEffect(() => {
    async function carregarDados() {
      try {
        const livro = await buscarLivroPorId(id);
        reset({
          titulo: livro.titulo || "",
          isbn: livro.isbn || "",
          anoPublicacao: livro.anoPublicacao || "",
          generoId: livro.genero?.id || livro.generoId || "",
          autorId: livro.autor?.id || livro.autorId || "",
          editoraId: livro.editora?.id || livro.editoraId || "",
        });
      } catch {
        setErroAPI("Não foi possível carregar os dados deste livro.");
      }
    }
    carregarDados();
  }, [id, reset]);

  async function onSubmit(dados) {
    setErroAPI("");
    setSucesso("");
    try {
      await atualizarLivro(id, dados);
      setSucesso("Livro atualizado com sucesso!");
      setTimeout(() => navigate("/livros"), 2000);
    } catch {
      setErroAPI("Erro ao tentar atualizar o livro.");
    }
  }

  async function apagarLivro() {
    if (window.confirm("Tem certeza que deseja apagar este livro?")) {
      try {
        await deletarLivro(id);
        setSucesso("Livro apagado com sucesso!");
        setTimeout(() => navigate("/livros"), 2000);
      } catch {
        setErroAPI("Erro ao tentar apagar o livro.");
      }
    }
  }

  if (carregandoListas)
    return <p className="text-center mt-5">Carregando dados...</p>;

  return (
    <main className="pagina-formulario container mt-4">
      <section
        className="formulario-card formulario-card-livro shadow-sm p-4 rounded bg-white mx-auto"
        style={{ maxWidth: "800px" }}
      >
        <h1 className="formulario-titulo mb-4">Editar Livro</h1>

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
            error={errors.titulo?.message}
            {...register("titulo", { required: "O título é obrigatório" })}
          />

          <div className="row mb-3">
            <div className="col-md-6">
              <Input
                label="ISBN"
                error={errors.isbn?.message}
                {...register("isbn", { required: "O ISBN é obrigatório" })}
              />
            </div>
            <div className="col-md-6">
              <Input
                label="Ano de Publicação"
                type="number"
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

          <div className="d-flex justify-content-between mt-4 gap-3">
            <button
              type="submit"
              className="btn btn-marrom flex-grow-1"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Salvando..." : "Salvar Alterações"}
            </button>
            <button
              type="button"
              onClick={apagarLivro}
              className="btn btn-danger flex-grow-1"
            >
              Apagar Livro
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
