import { useContext } from "react";
import { authContext } from "../../contexts/authContext";
import { Link } from "react-router-dom";

const Header = () => {
  const { user, logout } = useContext(authContext);

  return (
    <header>
      <nav>
        <Link to="/home">Home</Link>
        {!user && <Link to="/login">Login</Link>}
        {user && <button onClick={logout}>Logout</button>}
      </nav>
    </header>
  );
};

export default Header;

