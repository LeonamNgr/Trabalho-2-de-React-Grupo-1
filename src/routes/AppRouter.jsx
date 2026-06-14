import { Navigate, Route, Routes } from "react-router-dom";

import Login from "../pages/Login/index.jsx";
import SobreNos from "../pages/SobreNos/index.jsx";
import Home from "../pages/Home/index.jsx";
import Livros from "../pages/Livros/index.jsx";
import AdicionarLivro from "../pages/AdicionarLivro/index.jsx";
import BuscarLivro from "../pages/BuscarLivro/index.jsx";
import EditarLivro from "../pages/EditarLivro/index.jsx";

import AdicionarAutor from "../pages/AdicionarAutor/index.jsx";
import AdicionarEditora from "../pages/AdicionarEditora/index.jsx";

import PrivateRoute from "./PrivateRoute.jsx";
import { AuthContext } from "../contexts/AuthContext.jsx";
import { useContext } from "react";

export default function AppRouter() {
  const { isLogged } = useContext(AuthContext);

  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to={isLogged ? "/home" : "/login"} replace />}
      />
      <Route path="/login" element={<Login />} />
      <Route path="/sobre" element={<SobreNos />} />

      <Route element={<PrivateRoute />}>
        <Route path="/home" element={<Home />} />
        <Route path="/livros" element={<Livros />} />
        <Route path="/livros/adicionar" element={<AdicionarLivro />} />
        <Route path="/livros/buscar" element={<BuscarLivro />} />
        <Route path="/livros/editar/:id" element={<EditarLivro />} />

        <Route path="/autores/adicionar" element={<AdicionarAutor />} />
        <Route path="/editoras/adicionar" element={<AdicionarEditora />} />
      </Route>
    </Routes>
  );
}
