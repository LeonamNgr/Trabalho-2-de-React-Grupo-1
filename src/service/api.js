import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


// MÉTODOS DE LIVRO 

export const buscarTodosOsLivros = async () => {
  const response = await api.get("/Livro/todos-os-livros");
  return response.data;
};

export const buscarLivroPorId = async (id) => {
  const response = await api.get(`/Livro/${id}`);
  return response.data;
};

export const criarLivro = async (dadosDoLivro) => {
  const response = await api.post("/Livro/adicionar-livro", dadosDoLivro);
  return response.data;
};

export const atualizarLivro = async (id, dadosDoLivro) => {
  const response = await api.put(`/Livro/atualizar-livro/${id}`, dadosDoLivro);
  return response.data;
};

export const deletarLivro = async (id) => {
  const response = await api.delete(`/Livro/deletar-livro/${id}`);
  return response.data;
};


// MÉTODOS DE AUTOR

export const buscarAutores = async () => {
  const response = await api.get("/Autor/todos-os-autores"); 
  return response.data;
};

export const criarAutor = async (dadosDoAutor) => {
  const response = await api.post("/Autor/adicionar-autor", dadosDoAutor);
  return response.data;
};


// MÉTODOS DE EDITORA

export const buscarEditoras = async () => {
  const response = await api.get("/Editora/todas-as-editoras");
  return response.data;
};

export const criarEditora = async (dadosDaEditora) => {
  const response = await api.post("/Editora/adicionar-editora", dadosDaEditora);
  return response.data;
};


// MÉTODOS DE GÉNERO

export const buscarGeneros = async () => {
  const response = await api.get("/generos/todos-os-generos");
  return response.data;
};

export const criarGenero = async (dadosDoGenero) => {
  const response = await api.post("/generos/adicionar-genero", dadosDoGenero);
  return response.data;
};

export default api;