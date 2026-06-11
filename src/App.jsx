import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login/index.jsx";
import Home from "./pages/Home/home.jsx";
import AdicionarLivro from "./pages/AdicionarLivro/index.jsx";
import BuscarLivro from "./pages/BuscarLivro/index.jsx";
import EditarLivro from "./pages/EditarLivro/index.jsx";
import Navbar from "./components/NavBar/index.jsx";
import PrivateRoute from "./routes/privateRoute.jsx";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
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
          path="/cadastrar"
          element={
            <PrivateRoute>
              <AdicionarLivro />
            </PrivateRoute>
          }
        />
        <Route
          path="/buscar"
          element={
            <PrivateRoute>
              <BuscarLivro />
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
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </>
  );
}

export default App;
