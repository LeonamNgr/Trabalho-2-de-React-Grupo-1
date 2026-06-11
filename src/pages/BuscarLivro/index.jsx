import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { buscarLivroPorId } from '../../services/api'; 

export default function BuscarLivro() {
  const [livroEncontrado, setLivroEncontrado] = useState(null);
  const [erroAPI, setErroAPI] = useState('');

  const { register, handleSubmit, formState: { errors } } = useForm();

  async function onSubmit(dados) {
    setErroAPI(''); 
    setLivroEncontrado(null); 

    try {
      const resultado = await buscarLivroPorId(dados.idLivro);
      setLivroEncontrado(resultado);
    } catch {
      setErroAPI('Livro não encontrado. Verifique se o ID está correto.');
    }
  }

  return (
    <div className="container mt-5">
      <div className="card shadow p-4 mx-auto" style={{ maxWidth: '600px' }}>
        <h2 className="text-center mb-4">Buscar Livro por ID</h2>

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

        {erroAPI && <div className="alert alert-danger text-center">{erroAPI}</div>}

        {livroEncontrado && (
          <div className="card border-success mb-3">
            <div className="card-header bg-success text-white fw-bold">
              Livro Encontrado!
            </div>
            <div className="card-body">
              <h4 className="card-title text-success">{livroEncontrado.titulo}</h4>
              
             
              <h6 className="card-subtitle mb-3 text-muted">
                Autor: {livroEncontrado.autor?.nome || livroEncontrado.autor}
              </h6>
              <p className="card-text">
                <strong>Editora:</strong> {livroEncontrado.editora?.nome || livroEncontrado.editora}
              </p>
              
              <hr />
              
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