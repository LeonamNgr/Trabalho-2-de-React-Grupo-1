import { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import { AuthContext } from "../../contexts/AuthContext";
import styles from "./Login.module.css";

export default function Login() {
  const { login, error, isLogged, limparErro } =
    useContext(AuthContext);

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  if (isLogged) {
    return <Navigate to="/home" replace />;
  }

  async function autenticar(event) {
    event.preventDefault();

    const sucesso = await login(email, senha);

    if (sucesso) {
      navigate("/home", { replace: true });
    }
  }

  function alterarEmail(valor) {
    limparErro();
    setEmail(valor);
  }

  function alterarSenha(valor) {
    limparErro();
    setSenha(valor);
  }

  return (
    <main className={styles.pagina}>
      <div className={styles.fundoDecorativo}></div>

      <form className={styles.formulario} onSubmit={autenticar}>
        <img
          src="/imagens/logo-redonda-fundo-roxo.svg"
          alt="Logo da Biblioteca Era uma vez"
          className={styles.logo}
        />

        <h1 className={styles.titulo}>Login</h1>

        <p className={styles.nomeMarca}>Era uma vez...</p>

        <p className={styles.subtitulo}>
          Sistema de gerenciamento de bibliotecas
        </p>

        <Input
          name="email"
          label="E-mail"
          value={email}
          onChange={alterarEmail}
          placeholder="Digite seu e-mail"
          type="email"
          isRequired
        />

        <Input
          name="senha"
          label="Senha"
          value={senha}
          onChange={alterarSenha}
          placeholder="Digite sua senha"
          type="password"
          isRequired
        />

        {error && (
          <div className="alert alert-danger py-2 text-center">
            {error}
          </div>
        )}

        <button type="submit" className="btn btn-marrom w-100">
          Entrar
        </button>
      </form>
    </main>
  );
}