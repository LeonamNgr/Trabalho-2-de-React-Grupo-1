import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  buscarAutores,
  buscarEditoras,
  buscarGeneros,
  criarLivro,
} from "../../service/api";
import Input from "../../components/Input";
import Select from "../../components/Select";

export default function AdicionarLivro() {
  const navigate = useNavigate();
  const [erroAPI, setErroAPI] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [autores, setAutores] = useState([]);
  const [editoras, setEditoras] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [autorDigitado, setAutorDigitado] = useState("");
  const [editoraDigitada, setEditoraDigitada] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  useEffect(() => {
    async function carregarListas() {
      try {
        const [listaAutores, listaEditoras, listaGeneros] = await Promise.all([
          buscarAutores(),
          buscarEditoras(),
          buscarGeneros(),
        ]);

        setAutores(listaAutores);
        setEditoras(listaEditoras);
        setGeneros(listaGeneros);
      } catch {
        setErroAPI(
          "Erro ao carregar as listas de opções. Verifique a conexão.",
        );
      }
    }

    carregarListas();
  }, []);

  function normalizarTexto(texto) {
    return String(texto ?? "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();
  }

  function atualizarAutor(evento) {
    const nomeDigitado = evento.target.value;
    setAutorDigitado(nomeDigitado);

    const autorEncontrado = autores.find(
      (autor) => normalizarTexto(autor.nome) === normalizarTexto(nomeDigitado),
    );

    setValue("autorId", autorEncontrado?.id || "", {
      shouldValidate: true,
    });
  }

  function atualizarEditora(evento) {
    const nomeDigitado = evento.target.value;
    setEditoraDigitada(nomeDigitado);

    const editoraEncontrada = editoras.find(
      (editora) =>
        normalizarTexto(editora.nome) === normalizarTexto(nomeDigitado),
    );

    setValue("editoraId", editoraEncontrada?.id || "", {
      shouldValidate: true,
    });
  }

  async function onSubmit(dadosDoFormulario) {
    setErroAPI("");
    setSucesso("");

    try {
      await criarLivro(dadosDoFormulario);
      setSucesso("Livro adicionado com sucesso!");
      reset();
      setAutorDigitado("");
      setEditoraDigitada("");
      setTimeout(() => navigate("/home"), 2000);
    } catch {
      setErroAPI("Erro ao comunicar com a API. Tente novamente.");
    }
  }

  return (
    <main className="pagina-formulario">
      <section className="formulario-card formulario-card-livro">
        <h1 className="formulario-titulo">Adicionar Novo Livro</h1>

        {erroAPI && <div className="alert alert-danger">{erroAPI}</div>}

        {sucesso && <div className="alert alert-success">{sucesso}</div>}

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
            options={generos.map((genero) => ({
              value: genero.id,
              label: `${genero.nome} (${genero.sigla})`,
            }))}
            {...register("generoId", {
              required: "Selecione um gênero",
              valueAsNumber: true,
            })}
          />

          <div className="mb-3">
            <label className="form-label" htmlFor="autor">
              Autor
            </label>

            <input
              id="autor"
              type="text"
              list="lista-autores"
              className={`form-control ${errors.autorId ? "is-invalid" : ""}`}
              placeholder="Digite o nome do autor"
              value={autorDigitado}
              onChange={atualizarAutor}
              autoComplete="off"
            />

            <datalist id="lista-autores">
              {autores.map((autor) => (
                <option key={autor.id} value={autor.nome} />
              ))}
            </datalist>

            <input
              type="hidden"
              {...register("autorId", {
                required: "Digite ou selecione um autor cadastrado",
                valueAsNumber: true,
              })}
            />

            {errors.autorId && (
              <span className="invalid-feedback d-block">
                {errors.autorId.message}
              </span>
            )}

            <Link
              to="/autores/adicionar"
              className="btn btn-outline-secondary mt-2"
            >
              Cadastrar novo autor
            </Link>
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="editora">
              Editora
            </label>

            <input
              id="editora"
              type="text"
              list="lista-editoras"
              className={`form-control ${errors.editoraId ? "is-invalid" : ""}`}
              placeholder="Digite o nome da editora"
              value={editoraDigitada}
              onChange={atualizarEditora}
              autoComplete="off"
            />

            <datalist id="lista-editoras">
              {editoras.map((editora) => (
                <option key={editora.id} value={editora.nome} />
              ))}
            </datalist>

            <input
              type="hidden"
              {...register("editoraId", {
                required: "Digite ou selecione uma editora cadastrada",
                valueAsNumber: true,
              })}
            />

            {errors.editoraId && (
              <span className="invalid-feedback d-block">
                {errors.editoraId.message}
              </span>
            )}

            <Link
              to="/editoras/adicionar"
              className="btn btn-outline-secondary mt-2"
            >
              Cadastrar nova editora
            </Link>
          </div>

          <button type="submit" className="btn btn-marrom btn-formulario">
            Guardar Livro
          </button>
        </form>
      </section>
    </main>
  );
}
