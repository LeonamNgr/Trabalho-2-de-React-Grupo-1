import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { buscarTodosOsLivros } from "../../service/api";
import { normalizarTexto } from "../../utils/normalizarTexto";
import Input from "../../components/Input";
import styles from "./Home.module.css";

import meninaVoandoLivro from "../../assets/imagens/menina-voando-livro.svg";
import { CardLivroSimples } from "../../components/CardLivroSimples";

export default function Home() {
  const [livros, setLivros] = useState([]);
  const [busca, setBusca] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarLivros() {
      try {
        const dados = await buscarTodosOsLivros();
        setLivros(Array.isArray(dados) ? dados : dados?.content || []);
      } catch (error) {
        console.error("Erro ao buscar livros para a Home:", error);
      } finally {
        setLoading(false);
      }
    }
    carregarLivros();
  }, []);

  const livrosFiltrados = useMemo(() => {
    if (!busca) return livros;
    const termoBusca = normalizarTexto(busca);
    return livros.filter((livro) =>
      normalizarTexto(livro.titulo).includes(termoBusca),
    );
  }, [livros, busca]);

  return (
    <main className={styles.container}>
      <section className={styles.hero}>
        <div>
          <p className={styles.tag}>Sistema de gerenciamento de biblioteca</p>
          <h1 className={styles.titulo}>Era uma vez...</h1>
          <p className={styles.subtitulo}>
            Organize, consulte e gerencie os livros cadastrados no arquivo da
            biblioteca de forma simples e rápida.
          </p>
          <div className={styles.botoes}>
            <Link to="/livros" className="btn btn-marrom">
              Ver todos os livros
            </Link>
            <Link to="/livros/adicionar" className={styles.botaoSecundario}>
              Cadastrar livro
            </Link>
          </div>
        </div>
        <div className={styles.caixaDestaque}>
          <img
            src={meninaVoandoLivro}
            alt="Ilustração de uma menina voando em cima de um livro aberto"
            className={styles.imagemHero}
          />
          <div className={styles.contadorLivros}>
            <h2>{livros.length}</h2>
            <p>livros cadastrados!</p>
          </div>
        </div>
      </section>

      <section className={styles.resumo}>
        <Link to="/livros/buscar" className={styles.cardResumo}>
          <h3>Consulta rápida</h3>
          <p>Busque livros cadastrados por título.</p>
        </Link>
        <Link to="/livros/adicionar" className={styles.cardResumo}>
          <h3>Cadastro</h3>
          <p>Adicione novos livros ao sistema.</p>
        </Link>
        <Link to="/livros" className={styles.cardResumo}>
          <h3>Gerenciamento</h3>
          <p>Visualize, edite e acompanhe os registros.</p>
        </Link>
      </section>

      <section className={styles.areaLivros}>
        <div className={styles.cabecalhoLista}>
          <div>
            <h2>Prévia dos livros</h2>
            <p>Veja alguns livros disponíveis no sistema.</p>
          </div>
          <div className={styles.inputBuscaContainer}>
            <Input
              type="search"
              placeholder="Filtrar por título"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              wrapperClass=""
              className={`form-control ${styles.inputBusca}`}
            />
          </div>
        </div>

        {loading ? (
          <p className="text-center">Carregando livros...</p>
        ) : livrosFiltrados.length === 0 ? (
          <div className="alert alert-warning text-center">
            Nenhum livro encontrado.
          </div>
        ) : (
          <section className={styles.lista}>
            {livrosFiltrados.slice(0, 6).map((livro, index) => (
              <CardLivroSimples key={livro.id} livro={livro} index={index} />
            ))}
          </section>
        )}
      </section>
    </main>
  );
}
