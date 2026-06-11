import { useContext, useEffect, useState } from "react";
import { authContext } from "../../contexts/authContext";
import axios from "axios";
import "./Home.css";

const Home = () => {
  const { user } = useContext(authContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Exemplo: consumindo uma API pública
  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        setData(response.data.slice(0, 5)); // pega só 5 itens
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar dados:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="home-container">
      <h1>Bem-vindo, {user?.username}!</h1>
      <p>Essa é a página inicial protegida pelo login.</p>

      {loading ? (
        <p>Carregando dados...</p>
      ) : (
        <ul className="data-list">
          {data.map((item) => (
            <li key={item.id}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;
