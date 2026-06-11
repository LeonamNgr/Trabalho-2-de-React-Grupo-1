import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { authContext } from "../contexts/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user } = useContext(authContext);

  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
