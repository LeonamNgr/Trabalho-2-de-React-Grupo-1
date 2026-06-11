import axios from "axios";


const api = axios.create({
  baseURL: "http://localhost:8080",
});


export const buscarTodosOsLivros = async () => {
  const response = await api.get('/Livro/todos-os-livros'); 
  return response.data;
};

export const buscarLivroPorId = async (id) => {
  const response = await api.get(`/Livro/${id}`);
  return response.data;
};

export const criarLivro = async (dadosDoLivro) => {
  const response = await api.post('/Livro/adicionar-livro', dadosDoLivro);
  return response.data;
};

export const atualizarLivro = async (id, dadosDoLivro) => {
  const response = await api.put(`/Livro/atualizar-livro/${id}`, dadosDoLivro);
  return response.data;
};

// Deletar livro
export const deletarLivro = async (id) => {
  const response = await api.delete(`/Livro/deletar-livro/${id}`);
  return response.data;
};

export default api;