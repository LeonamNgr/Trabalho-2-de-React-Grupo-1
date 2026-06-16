import { useState, useEffect, useCallback } from "react";
import {
  buscarAutores,
  buscarEditoras,
  buscarGeneros,
  buscarTodosOsLivros,
} from "../service/api";

export function useListasAuxiliares() {
  const [autores, setAutores] = useState([]);
  const [editoras, setEditoras] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [livros, setLivros] = useState([]);
  const [carregandoListas, setCarregandoListas] = useState(true);

  const recarregarListas = useCallback(async () => {
    setCarregandoListas(true);
    try {
      const [listaAutores, listaEditoras, listaGeneros, dadosLivros] =
        await Promise.all([
          buscarAutores(),
          buscarEditoras(),
          buscarGeneros(),
          buscarTodosOsLivros(),
        ]);

      setAutores(listaAutores);
      setEditoras(listaEditoras);
      setGeneros(listaGeneros);

      const listaLivros = Array.isArray(dadosLivros)
        ? dadosLivros
        : dadosLivros?.content || [];
      setLivros(listaLivros);

      return { listaAutores, listaEditoras, listaGeneros, listaLivros };
    } catch (erro) {
      console.error("Erro ao carregar listas auxiliares:", erro);
      return {
        listaAutores: [],
        listaEditoras: [],
        listaGeneros: [],
        listaLivros: [],
      };
    } finally {
      setCarregandoListas(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    recarregarListas();
  }, [recarregarListas]);

  const nomesDosLivros = livros.map(
    (livro) => livro.titulo || livro.nome || livro.nomeLivro || "",
  );

  return {
    autores,
    editoras,
    generos,
    livros,
    nomesDosLivros,
    carregandoListas,
    recarregarListas,
  };
}
