import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const Login = () => {
  const { login, error } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [localError, setLocalError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/home");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !senha) {
      setLocalError("Preencha todos os campos!");
      return;
    }

    setLocalError("");
    const success = await login(email, senha);

    if (success) {
      navigate("/home");
    }
  };

  const displayedError = localError || (typeof error === "string" ? error : error?.message || "");

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

          <button className="btn btn-marrom w-100" type="submit">
            Entrar
          </button>

          {displayedError && <p className="text-danger text-center mt-3">{displayedError}</p>}
        </form>
      </div>
    </main>
  );
};

export default Login;
