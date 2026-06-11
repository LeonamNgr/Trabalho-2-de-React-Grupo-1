import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const Login = () => {
  const { user, login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  function handleSubmit(e) {
    e.preventDefault();

    if (!username || !password) {
      setError("Preencha todos os campos!");
      return;
    }

    const success = login(username, password);

    if (success) {
      navigate("/");
    } else {
      setError("Usuário ou senha inválidos!");
    }
  }

  return (
    <main className="main-container d-flex align-items-center justify-content-center">
      <div className="card shadow p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="page-title">Login</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Usuário</label>
            <input
              className="form-control"
              type="text"
              placeholder="Digite seu usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Senha</label>
            <input
              className="form-control"
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="btn btn-marrom w-100" type="submit">
            Entrar
          </button>

          {error && <p className="text-danger text-center mt-3">{error}</p>}
        </form>
      </div>
    </main>
  );
};

export default Login;