import axios from 'axios';

// Configuração base da API
const api = axios.create({
  baseURL: 'http://localhost:8080' 
});

// Buscar um livro específico (GET)
export const buscarLivroPorId = async (id) => {
  const response = await api.get(`/livros/${id}`);
  return response.data;
};

// Buscar todos os livros (GET)
export const buscarTodosOsLivros = async () => {
  const response = await api.get('/livros');
  return response.data; // Vai devolver a lista/array com todos os livros
};

// Criar um novo livro (POST)
export const criarLivro = async (dadosDoLivro) => {
  const response = await api.post('/livros', dadosDoLivro);
  return response.data;
};

// Atualizar um livro existente (PUT)
export const atualizarLivro = async (id, dadosDoLivro) => {
  const response = await api.put(`/livros/${id}`, dadosDoLivro);
  return response.data;
};

// Deletar um livro (DELETE)
export const deletarLivro = async (id) => {
  const response = await api.delete(`/livros/${id}`);
  return response.data;
};

export default api;