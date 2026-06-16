import styles from "./BuscarLivro.module.css";
import Select from "../../components/Select/index.jsx";
import Input from "../../components/Input/index.jsx";
import { useBuscarLivros } from "../../hooks/useBuscarLivros.js";
import { CardLivroEncontrado } from "../../components/CardLivroEncontrado/index.jsx";

const opcoesDeBusca = [
  { value: "nome", label: "Nome do livro" },
  { value: "autor", label: "Autor" },
  { value: "genero", label: "Gênero" },
];

const placeholders = {
  nome: "Digite o nome do livro",
  autor: "Digite o nome do autor",
  genero: "Digite o gênero do livro",
};

export default function BuscarLivro() {
  const {
    tipoBusca,
    termoBusca,
    setTermoBusca,
    livrosEncontrados,
    mensagem,
    carregando,
    buscaRealizada,
    executarBusca,
    trocarTipoBusca,
  } = useBuscarLivros();

  return (
    <main className={`pagina-formulario ${styles.container}`}>
      <section className={`formulario-card ${styles.busca}`}>
        <header className={styles.cabecalho}>
          <h1 className="formulario-titulo">Buscar Livros</h1>
          <p>Consulte se um livro está disponível em nossa base de dados.</p>
        </header>

        <form className={styles.formulario} onSubmit={executarBusca}>
          <Select
            id="tipoBusca"
            label="Buscar por"
            wrapperClass={styles.campo}
            options={opcoesDeBusca}
            value={tipoBusca}
            onChange={trocarTipoBusca}
          />

          <div className={styles.campo}>
            <Input
              id="termoBusca"
              label="Digite sua busca"
              type="search"
              value={termoBusca}
              onChange={(e) => setTermoBusca(e.target.value)}
              placeholder={placeholders[tipoBusca]}
            />
          </div>

          <button
            type="submit"
            className={`btn btn-marrom btn-formulario ${styles.botaoBusca}`}
            disabled={carregando}
          >
            {carregando ? "Carregando biblioteca..." : "Buscar"}
          </button>
        </form>

        {mensagem && (
          <p className={styles.mensagem} role="alert">
            {mensagem}
          </p>
        )}
      </section>

      {buscaRealizada && livrosEncontrados.length > 0 && (
        <section className={styles.resultados}>
          {livrosEncontrados.map((livro) => (
            <CardLivroEncontrado key={livro.id} livro={livro} />
          ))}
        </section>
      )}
    </main>
  );
}
