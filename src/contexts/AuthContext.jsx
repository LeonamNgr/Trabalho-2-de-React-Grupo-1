import { createContext } from "react";
import { useState } from "react";
import api from "../service/api";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [error, setError] = useState("");

  const login = async (email, senha) => {
    try {
      const response = await api.post("/auth/autenticar", { email, senha });
      const token = response.data.token;
      localStorage.setItem("token", token);
      setError("");
      return true;
    } catch (error) {
      setError("Usuário ou senha inválidos.");
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ login, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
};
