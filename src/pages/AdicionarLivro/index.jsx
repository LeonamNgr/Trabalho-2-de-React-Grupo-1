import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { 
  criarLivro, 
  buscarAutores, 
  buscarEditoras, 
  buscarGeneros 
} from "../../service/api";

export default function AdicionarLivro() {
  const navigate = useNavigate();
  const [erroAPI, setErroAPI] = useState("");
  const [sucesso, setSucesso] = useState("");

  // Estados para guardar as listas vindas da API
  const [autores, setAutores] = useState([]);
  const [editoras, setEditoras] = useState([]);
  const [generos, setGeneros] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Busca os dados assim que o componente é montado no ecrã
  useEffect(() => {
    async function carregarListas() {
      try {
        const [listaAutores, listaEditoras, listaGeneros] = await Promise.all([
          buscarAutores(),
          buscarEditoras(),
          buscarGeneros()
        ]);
        
        setAutores(listaAutores);
        setEditoras(listaEditoras);
        setGeneros(listaGeneros);
      } 
      catch {
        setErroAPI("Erro ao carregar as listas de opções. Verifique a conexão.");
      }
    }
    carregarListas();
  }, []);

  async function onSubmit(dadosDoFormulario) {
    setErroAPI("");
    setSucesso("");

    try {
      await criarLivro(dadosDoFormulario);
      setSucesso("Livro adicionado com sucesso!");
      reset();
      setTimeout(() => navigate("/home"), 2000);
    } catch {
      setErroAPI("Erro ao comunicar com a API. Tente novamente.");
    }
  }

  return (
    <div className="container mt-5">
      <div className="card shadow p-4 mx-auto" style={{ maxWidth: "600px" }}>
        <h2 className="text-center mb-4">Adicionar Novo Livro</h2>

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
            {errors.titulo && <span className="invalid-feedback">{errors.titulo.message}</span>}
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label fw-bold">ISBN</label>
              <input
                type="text"
                className={`form-control ${errors.isbn ? "is-invalid" : ""}`}
                {...register("isbn", { required: "O ISBN é obrigatório" })}
              />
              {errors.isbn && <span className="invalid-feedback">{errors.isbn.message}</span>}
            </div>

            <div className="col-md-6">
              <label className="form-label fw-bold">Ano de Publicação</label>
              <input
                type="number"
                className={`form-control ${errors.anoPublicacao ? "is-invalid" : ""}`}
                {...register("anoPublicacao", { 
                  required: "O ano é obrigatório",
                  valueAsNumber: true 
                })}
              />
              {errors.anoPublicacao && <span className="invalid-feedback">{errors.anoPublicacao.message}</span>}
            </div>
          </div>

          {/* === GÊNERO (SELECT) === */}
          <div className="mb-3">
            <label className="form-label fw-bold">Gênero</label>
            <select
              className={`form-select ${errors.generoId ? "is-invalid" : ""}`}
              {...register("generoId", { 
                required: "Selecione um gênero",
                valueAsNumber: true // Retorna o ID como Number para a API
              })}
            >
              <option value="">Selecione um gênero...</option>
              {generos.map((genero) => (
                <option key={genero.id} value={genero.id}>
                  {genero.nome} ({genero.sigla})
                </option>
              ))}
            </select>
            {errors.generoId && <span className="invalid-feedback">{errors.generoId.message}</span>}
          </div>

          {/* === AUTOR (SELECT) === */}
          <div className="mb-3">
            <label className="form-label fw-bold">Autor</label>
            <select
              className={`form-select ${errors.autorId ? "is-invalid" : ""}`}
              {...register("autorId", { 
                required: "Selecione um autor",
                valueAsNumber: true 
              })}
            >
              <option value="">Selecione um autor...</option>
              {autores.map((autor) => (
                <option key={autor.id} value={autor.id}>
                  {autor.nome}
                </option>
              ))}
            </select>
            {errors.autorId && <span className="invalid-feedback">{errors.autorId.message}</span>}
          </div>

          {/* === EDITORA (SELECT) === */}
          <div className="mb-3">
            <label className="form-label fw-bold">Editora</label>
            <select
              className={`form-select ${errors.editoraId ? "is-invalid" : ""}`}
              {...register("editoraId", { 
                required: "Selecione uma editora",
                valueAsNumber: true 
              })}
            >
              <option value="">Selecione uma editora...</option>
              {editoras.map((editora) => (
                <option key={editora.id} value={editora.id}>
                  {editora.nome}
                </option>
              ))}
            </select>
            {errors.editoraId && <span className="invalid-feedback">{errors.editoraId.message}</span>}
          </div>

          <button type="submit" className="btn btn-primary w-100 mt-3 fw-bold">
            Guardar Livro
          </button>
        </form>
      </div>
    </div>
  );
}