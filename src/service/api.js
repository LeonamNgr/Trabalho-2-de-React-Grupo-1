import axios from "axios";

const api = axios.create({
  baseURL: "/api",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

export function extrairMensagemErro(
  error,
  mensagemPadrao = "Ocorreu um erro ao comunicar com a API.",
) {
  const dados = error.response?.data;

  if (Array.isArray(dados?.erros) && dados.erros.length > 0) {
    return dados.erros[0];
  }

  if (typeof dados?.mensagem === "string") {
    return dados.mensagem;
  }

  if (typeof dados?.message === "string") {
    return dados.message;
  }

  if (!error.response) {
    return "Não foi possível acessar a API. Verifique se o arquivo JAR está rodando na porta 8080.";
  }

  return mensagemPadrao;
}

export async function buscarTodosOsLivros() {
  const response = await api.get("/Livro/todos-os-livros");
  return response.data;
}

export async function buscarLivroPorId(id) {
  const response = await api.get(`/Livro/${id}`);
  return response.data;
}

export async function criarLivro(dadosDoLivro) {
  const response = await api.post("/Livro/adicionar-livro", dadosDoLivro);
  return response.data;
}

export async function atualizarLivro(id, dadosDoLivro) {
  const response = await api.put(
    `/Livro/atualizar-livro/${id}`,
    dadosDoLivro,
  );
  return response.data;
}

export async function deletarLivro(id) {
  await api.delete(`/Livro/deletar-livro/${id}`);
}

export async function buscarTodosOsAutores() {
  const response = await api.get("/Autor/todos-os-autores");
  return response.data;
}

export async function buscarTodasAsEditoras() {
  const response = await api.get("/Editora/todas-as-editoras");
  return response.data;
}

export async function buscarTodosOsGeneros() {
  const response = await api.get("/generos/todos-os-generos");
  return response.data;
}

export default api;
