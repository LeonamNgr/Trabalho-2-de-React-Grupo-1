/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react";
import api, { extrairMensagemErro } from "../service/api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [error, setError] = useState("");
  const [isLogged, setIsLogged] = useState(
    Boolean(localStorage.getItem("token")),
  );

  async function login(email, senha) {
    setError("");

    try {
      const response = await api.post("/auth/autenticar", {
        email: email.trim(),
        senha,
      });

      const token = response.data?.token;

      if (!token) {
        setError("A API não retornou o token de autenticação.");
        return false;
      }

      localStorage.setItem("token", token);
      setIsLogged(true);
      return true;
    } catch (err) {
      setError(
        extrairMensagemErro(err, "Usuário ou senha inválidos."),
      );
      return false;
    }
  }

  function logout() {
    localStorage.removeItem("token");
    setIsLogged(false);
    setError("");
  }

  function limparErro() {
    setError("");
  }

  return (
    <AuthContext.Provider
      value={{ login, logout, limparErro, error, isLogged }}
    >
      {children}
    </AuthContext.Provider>
  );
}
