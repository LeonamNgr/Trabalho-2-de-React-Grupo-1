import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/index.jsx";
import Home from "./pages/Home/home.jsx";
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
      </Routes>
    </>
  );
}

export default App;
