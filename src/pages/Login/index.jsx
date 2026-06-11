import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

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

  return (
    <div className="card shadow p-4">
      <h2 className="page-title">Login</h2>

      <form onSubmit={autenticar}>
        <div className="mb-3">
          <label className="form-label">Usuário</label>
          <input
            className="form-control"
            type="text"
            placeholder="Digite seu usuário"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Senha</label>
          <input
            className="form-control"
            type="password"
            placeholder="Digite sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </div>

        <button type="submit">Entrar</button>

        {error && <p className="text-danger text-center mt-3">{error}</p>}
      </form>
    </div>
  );
}
