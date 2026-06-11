import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { buscarLivroPorId } from '../../services/api'; // Confirme o caminho correto

export default function BuscarLivro() {
  const [livroEncontrado, setLivroEncontrado] = useState(null);
  const [erroAPI, setErroAPI] = useState('');

  const { register, handleSubmit, formState: { errors } } = useForm();

  // Função disparada ao clicar em "Pesquisar"
  async function onSubmit(dados) {
    setErroAPI(''); // Limpa erros antigos
    setLivroEncontrado(null); // Esconde resultados antigos

    try {
      // Chama a nossa API passando o ID digitado no formulário
      const resultado = await buscarLivroPorId(dados.idLivro);
      
      // Se a API devolver algo vazio ou erro, o catch apanha. 
      // Se der sucesso, guardamos o livro no estado para o desenhar na tela.
      setLivroEncontrado(resultado);
    } catch {
      setErroAPI('Livro não encontrado. Verifique se o ID está correto.');
    }
  }

  return (
    <div className="container mt-5">
      <div className="card shadow p-4 mx-auto" style={{ maxWidth: '600px' }}>
        <h2 className="text-center mb-4">Buscar Livro por ID</h2>

        {/* Formulário de Pesquisa */}
        <form onSubmit={handleSubmit(onSubmit)} className="d-flex mb-4">
          <div className="flex-grow-1 me-2">
            <input 
              type="text" 
              className={`form-control ${errors.idLivro ? 'is-invalid' : ''}`}
              placeholder="Digite o ID do livro (Ex: 1, 2, 3...)"
              {...register('idLivro', { required: 'Por favor, insira um ID para buscar.' })}
            />
            {errors.idLivro && <span className="invalid-feedback">{errors.idLivro.message}</span>}
          </div>
          
          <button type="submit" className="btn btn-primary fw-bold">
            Pesquisar
          </button>
        </form>

        {/* Mensagem de Erro (se o ID não existir) */}
        {erroAPI && <div className="alert alert-danger text-center">{erroAPI}</div>}

        {/* Cartão de Resultado (Só aparece se o livro for encontrado) */}
        {livroEncontrado && (
          <div className="card border-success mb-3">
            <div className="card-header bg-success text-white fw-bold">
              Livro Encontrado!
            </div>
            <div className="card-body">
              <h4 className="card-title text-success">{livroEncontrado.titulo}</h4>
              <h6 className="card-subtitle mb-3 text-muted">Autor: {livroEncontrado.autor}</h6>
              <p className="card-text"><strong>Editora:</strong> {livroEncontrado.editora}</p>
              
              <hr />
              
              {/* Botão prático para ir direto para a página de edição deste livro */}
              <Link to={`/editar/${livroEncontrado.id}`} className="btn btn-outline-success w-100">
                Editar este Livro
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}