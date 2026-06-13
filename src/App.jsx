import { Navigate, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar/index.jsx";

import Login from "./pages/Login/index.jsx";
import SobreNos from "./pages/SobreNos/index.jsx";
import Home from "./pages/Home/index.jsx";
import AdicionarLivro from "./pages/AdicionarLivro/index.jsx";
import BuscarLivro from "./pages/BuscarLivro/index.jsx";
import EditarLivro from "./pages/EditarLivro/index.jsx";
import Livros from "./pages/Livros/index.jsx";

import PrivateRoute from "./routes/privateRoute.jsx";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<Login />} />

        <Route path="/sobre" element={<SobreNos />} />

        {/* Rotas privadas */}
        <Route element={<PrivateRoute />}>
          <Route path="/home" element={<Home />} />

          <Route path="/livros" element={<Livros />} />

          <Route path="/livros/adicionar" element={<AdicionarLivro />} />

          <Route path="/livros/buscar" element={<BuscarLivro />} />

          <Route path="/livros/editar/:id" element={<EditarLivro />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
}

export default App;
