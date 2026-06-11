import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login/index.jsx";
import Home from "./pages/Home/index.jsx";


import Navbar from "./components/NavBar/index.jsx";
import PrivateRoute from "./routes/privateRoute.jsx";

import AdicionarLivro from "./pages/AdicionarLivro/index.jsx";
import BuscarLivro from "./pages/BuscarLivro/index.jsx";
import EditarLivro from "./pages/EditarLivro/index.jsx";

function App() {
  return (
    <>
    

      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />

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
      </Routes>
    </>
  );
}

export default App;