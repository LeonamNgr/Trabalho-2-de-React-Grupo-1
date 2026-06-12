import { createContext } from "react";
import { useState } from "react";
import api from "../service/api";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [error, setError] = useState("");
  const [isLogged, setIsLogged] = useState(!!localStorage.getItem("token"));

  const login = async (email, senha) => {
    try {
      const response = await api.post("/auth/autenticar", { email, senha });
      const token = response.data.token;
      localStorage.setItem("token", token);
      setIsLogged(true);
      setError("");
      return true;
    } catch (error) {
      setError("Usuário ou senha inválidos.");
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsLogged(false);
  };

  return (
    <AuthContext.Provider value={{ login, logout, error, isLogged }}>
      {children}
    </AuthContext.Provider>
  );
};
