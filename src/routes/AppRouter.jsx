import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import BuscarLivros from "../pages/BuscarLivro";
import AdicionarLivro from "../pages/AdicionarLivro";
import EditarLivro from "../pages/EditarLivro";
import Login from "../pages/Login";
import PrivateRoute from "./PrivateRoute";

export default function AppRouter() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/buscar"
          element={
            <PrivateRoute>
              <BuscarLivros />
            </PrivateRoute>
          }
        />
        <Route
          path="/adicionar"
          element={
            <PrivateRoute>
              <AdicionarLivro />
            </PrivateRoute>
          }
        />
        <Route
          path="/editar/:id"
          element={
            <PrivateRoute>
              <EditarLivro />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}
