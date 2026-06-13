import { createContext, useState } from "react";
import api from "../service/api";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [error, setError] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));
  const isLogged = !!token;

  const login = async (email, senha) => {
    try {
      const response = await api.post("/auth/autenticar", { email, senha });
      const newToken = response.data.token;

      localStorage.setItem("token", newToken);
      setToken(newToken);
      setError("");

      return true;
    } catch (err) {
      if (err.response?.data?.erros) {
        setError(err.response.data.erros[0]);
      } else if (err.response?.status === 403) {
        setError("Usuário ou senha inválidos.");
      } else {
        setError("Ocorreu um erro ao tentar fazer login.");
      }
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ login, logout, error, isLogged, token }}>
      {children}
    </AuthContext.Provider>
  );
};
