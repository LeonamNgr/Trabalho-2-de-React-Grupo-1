import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import livro from "../../assets/imagens/livros-voando.svg";
import logo from "../../assets/imagens/logo-redonda-fundo-roxo.svg";

import styles from "./Login.module.css";
import Input from "../../components/Input";

import { AuthContext } from "../../contexts/AuthContext.jsx";

export default function Login() {
  const { login, error } = useContext(AuthContext);

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function autenticar(evento) {
    evento.preventDefault();

    const success = await login(email, senha);

    if (success) {
      navigate("/home");
    }
  }

  return (
    <main className={styles.container}>
      <section className={styles.ilustracao}>
        <img
          src={livro}
          className={styles.livros}
          alt="Ilustração de livros voando"
        />

        <div className={styles.apresentacao}>
          <h1 className="fonte-rye">Era uma vez...</h1>

          <p>Sistema de gerenciamento de bibliotecas</p>
        </div>
      </section>

      <form
        className={styles.formulario}
        onSubmit={autenticar}
      >
        <div className={styles.cabecalho}>
          <img
            src={logo}
            className={styles.logo}
            alt="Logo da Biblioteca Era uma vez"
          />

          <h2 className="page-title fonte-rye">
            Login
          </h2>

          <p className={styles.descricao}>
            Entre com seus dados para acessar o sistema.
          </p>
        </div>

        <Input
          label="E-mail"
          onChange={setEmail}
          placeholder="Digite seu e-mail"
          value={email}
          type="email"
          isRequired={true}
        />

        <Input
          label="Senha"
          onChange={setSenha}
          placeholder="Digite sua senha"
          value={senha}
          type="password"
          isRequired={true}
        />

        {error && (
          <p
            className={styles.erro}
            role="alert"
          >
            {error}
          </p>
        )}

        <button
          type="submit"
          className={`btn-marrom ${styles.botaoEntrar}`}
        >
          Entrar
        </button>
      </form>
    </main>
  );
}