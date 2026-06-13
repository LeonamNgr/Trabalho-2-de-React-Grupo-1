import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/NavBar";
import PrivateRoute from "./routes/privateRoute";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Livros from "./pages/Livros";
import AdicionarLivro from "./pages/AdicionarLivro";
import BuscarLivro from "./pages/BuscarLivro";
import EditarLivro from "./pages/EditarLivro";

function RotaInicial() {
  const destino = localStorage.getItem("token") ? "/home" : "/login";
  return <Navigate to={destino} replace />;
}

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<RotaInicial />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />

        <Route
          path="/livros"
          element={
            <PrivateRoute>
              <Livros />
            </PrivateRoute>
          }
        />

        <Route
          path="/livros/adicionar"
          element={
            <PrivateRoute>
              <AdicionarLivro />
            </PrivateRoute>
          }
        />

        <Route
          path="/livros/buscar"
          element={
            <PrivateRoute>
              <BuscarLivro />
            </PrivateRoute>
          }
        />

        <Route
          path="/livros/editar/:id"
          element={
            <PrivateRoute>
              <EditarLivro />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<RotaInicial />} />
      </Routes>
    </>
  );
}
