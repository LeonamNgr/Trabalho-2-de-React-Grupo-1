import { Link } from "react-router-dom";

import livros from "../../assets/imagens/livros-voando.svg";

import styles from "./SobreNos.module.css";

export default function SobreNos() {
  return (
    <main className={styles.container}>
      <section className={styles.apresentacao}>
        <div className={styles.conteudo}>
          <span className={styles.destaque}>
            Sistema de Gerenciamento de Biblioteca
          </span>

          <h1 className="fonte-rye">Sobre nós</h1>

          <p>
            O Sistema de Gerenciamento de Biblioteca "Era uma vez..." é uma
            plataforma criada para facilitar o gerenciamento de livros, reunindo
            organização, tecnologia e praticidade em um só lugar.
          </p>

          <p>
            A plataforma permite cadastrar, consultar e localizar livros de
            maneira simples, auxiliando no controle e na organização do acervo
            da biblioteca.
          </p>

          <Link to="/" className={`btn-marrom ${styles.botaoVoltar}`}>
            Voltar para o login
          </Link>
        </div>

        <div className={styles.imagens}>
          <img
            src={livros}
            className={styles.livros}
            alt="Ilustração de livros voando"
          />
        </div>
      </section>

      <section className={styles.informacoes}>
        <article className={styles.card}>
          <h2>Nosso objetivo</h2>

          <p>
            Tornar o gerenciamento do acervo mais organizado, acessível e
            eficiente.
          </p>
        </article>

        <article className={styles.card}>
          <h2>O que oferecemos</h2>

          <p>
            Cadastro, pesquisa, consulta e visualização das informações dos
            livros da biblioteca.
          </p>
        </article>

        <article className={styles.card}>
          <h2>Projeto</h2>

          <p>
            Sistema desenvolvido pelo Grupo 1 como projeto de React.
            Integrantes: 1. Ana Paula Pimenta; 2. Diana Monteiro; 3. Laís
            Ferrari; 4. Leonam Machado; 5. Thiago Sinesio;
          </p>
        </article>
      </section>
    </main>
  );
}
