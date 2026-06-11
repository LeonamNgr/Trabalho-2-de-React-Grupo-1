import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/";
import Home from "./pages/Home/";
import PrivateRoute from "./routes/privateRoute.jsx";
import Header from "./components/Header/index.jsx";

function App() {
  return (
    <>
      <Header />
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
