import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { criarLivro } from '../../service/api'; 

export default function AdicionarLivro() {
  const navigate = useNavigate();
  const [erroAPI, setErroAPI] = useState('');
  const [sucesso, setSucesso] = useState('');

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  async function onSubmit(dadosDoFormulario) {
    setErroAPI('');
    setSucesso('');

    try {
      await criarLivro(dadosDoFormulario);
      
      setSucesso('Livro adicionado com sucesso!');
      reset(); 
      
      setTimeout(() => navigate('/'), 2000);
    } catch {
      setErroAPI('Erro ao comunicar com a API. Tente novamente.');
    }
  }

  return (
    <div className="container mt-5">
      <div className="card shadow p-4 mx-auto" style={{ maxWidth: '500px' }}>
        <h2 className="text-center mb-4">Adicionar Novo Livro</h2>

        {erroAPI && <div className="alert alert-danger">{erroAPI}</div>}
        {sucesso && <div className="alert alert-success">{sucesso}</div>}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label fw-bold">Título do Livro</label>
            <input 
              type="text" 
              className={`form-control ${errors.titulo ? 'is-invalid' : ''}`}
              placeholder="Ex: O Senhor dos Anéis"
              {...register('titulo', { required: 'O título é obrigatório' })}
            />
            {errors.titulo && <span className="invalid-feedback">{errors.titulo.message}</span>}
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Autor (Nome ou ID)</label>
            <input 
              type="text" 
              className={`form-control ${errors.autor ? 'is-invalid' : ''}`}
              placeholder="Ex: J.R.R. Tolkien ou 1"
              {...register('autor', { required: 'O autor é obrigatório' })}
            />
            {errors.autor && <span className="invalid-feedback">{errors.autor.message}</span>}
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Editora (Nome ou ID)</label>
            <input 
              type="text" 
              className={`form-control ${errors.editora ? 'is-invalid' : ''}`}
              placeholder="Ex: HarperCollins ou 2"
              {...register('editora', { required: 'A editora é obrigatória' })}
            />
            {errors.editora && <span className="invalid-feedback">{errors.editora.message}</span>}
          </div>

          <button type="submit" className="btn btn-primary w-100 mt-3 fw-bold">
            Guardar Livro
          </button>
        </form>
      </div>
    </div>
  );
}