import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { authContext } from "../../contexts/AuthContext";
import "./Login.css"; 

const Login = () => {
  const { login } = useContext(authContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Preencha todos os campos!");
      return;
    }
    const success = login(username, password);
    if (success) {
      navigate("/home");
    } else {
      setError("Usuário ou senha inválidos!");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Entrar</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
