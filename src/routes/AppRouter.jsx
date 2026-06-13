import { Navigate, Route, Routes } from "react-router-dom";

import Login from "../pages/Login/index.jsx";
import SobreNos from "../pages/SobreNos/index.jsx";
import Home from "../pages/Home/index.jsx";
import Livros from "../pages/Livros/index.jsx";
import AdicionarLivro from "../pages/AdicionarLivro/index.jsx";
import BuscarLivro from "../pages/BuscarLivro/index.jsx";
import EditarLivro from "../pages/EditarLivro/index.jsx";

import PrivateRoute from "./PrivateRoute.jsx";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/sobre" element={<SobreNos />} />

      <Route element={<PrivateRoute />}>
        <Route path="/home" element={<Home />} />
        <Route path="/livros" element={<Livros />} />
        <Route path="/livros/adicionar" element={<AdicionarLivro />} />
        <Route path="/livros/buscar" element={<BuscarLivro />} />
        <Route path="/livros/editar/:id" element={<EditarLivro />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
