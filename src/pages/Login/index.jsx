import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import logo from "../../../public/imagens/logo-redonda-fundo-roxo.svg";
import livro from "/imagens/livros-voando.svg";
import styles from "./Login.module.css";
import Input from "../../components/Input";

export default function Login() {
  const { login, error } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const autenticar = async (e) => {
    e.preventDefault();
    const sucesso = await login(email, senha);

    if (sucesso) {
      navigate("/home");
    }
  };

  console.log(error);

  return (
    <div className={styles.container}>
      <img
        src={livro}
        className="img-fluid "
        alt="Logo da Biblioteca - Era uma vez..."
        style={{ maxWidth: "600px" }}
      />
      <form onSubmit={autenticar}>
        <div>
          <img src={logo} style={{ maxWidth: "200px" }} />
          <h2 className="page-title fonte-rye">Login</h2>
        </div>
        <Input
          label="E-mail"
          onChange={setEmail}
          placeholder={"Digite seu e-mail"}
          value={email}
          type="text"
        />
        <Input
          label="Senha"
          onChange={setSenha}
          placeholder={"Digite sua senha"}
          value={senha}
          type="password"
        />
        {error && <p className="text-danger text-center fw-bold">{error}</p>}

        <button type="submit" className="btn-marrom">
          Entrar
        </button>
      </form>
    </div>
  );
}
