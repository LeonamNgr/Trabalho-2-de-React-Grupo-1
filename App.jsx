import { Routes, Route } from "react-router-dom";
import Login from "./src/pages/Login/index.jsx";
import Home from "./src/pages/Home/home.jsx";
import PrivateRoute from "./src/components/Header/privateRoute.jsx";
import Header from "./src/components/Header/index.jsx";

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
