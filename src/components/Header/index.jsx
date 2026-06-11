import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";

const Header = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <header>
      <nav>
        {user && <Link to="/home">Home</Link>}
        {user && <Link to="/livros/adicionar">Adicionar Livro</Link>}
        {user && <Link to="/livros/buscar">Buscar Livro</Link>}

        {!user && <Link to="/login">Login</Link>}

        {user && <button onClick={logout}>Logout</button>}
      </nav>
    </header>
  );
};

export default Header;