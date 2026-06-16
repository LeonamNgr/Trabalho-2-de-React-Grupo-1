import { useState, useMemo } from "react";
import { useListasAuxiliares } from "./useListasAuxiliares"; // Consumindo nossa nova Central!
import { normalizarTexto } from "../utils/normalizarTexto";

const pegarNomeLivro = (livro) =>
  livro.titulo || livro.nome || livro.nomeLivro || "";

export function useBuscarLivros() {
  const [tipoBusca, setTipoBusca] = useState("nome");
  const [termoBusca, setTermoBusca] = useState("");
  const [livrosEncontrados, setLivrosEncontrados] = useState([]);
  const [mensagem, setMensagem] = useState("");
  const [buscaRealizada, setBuscaRealizada] = useState(false);

  const {
    autores: listaAutores,
    generos: listaGeneros,
    livros: listaLivros,
    carregandoListas,
  } = useListasAuxiliares();

  const mapaAutores = useMemo(
    () =>
      listaAutores.reduce(
        (acc, autor) => ({ ...acc, [autor.id]: autor.nome }),
        {},
      ),
    [listaAutores],
  );
  const mapaGeneros = useMemo(
    () =>
      listaGeneros.reduce(
        (acc, genero) => ({
          ...acc,
          [genero.id]: `${genero.nome} (${genero.sigla})`,
        }),
        {},
      ),
    [listaGeneros],
  );

  const pegarAutor = (livro) =>
    livro.autorNome ||
    livro.autor?.nome ||
    mapaAutores[livro.autorId || livro.autorid] ||
    "Autor não informado";
  const pegarGenero = (livro) =>
    livro.generoSigla ||
    livro.genero?.nome ||
    mapaGeneros[livro.generoId || livro.generold] ||
    "Gênero não informado";

  function executarBusca(evento) {
    evento.preventDefault();
    const termo = normalizarTexto(termoBusca);

    if (!termo) {
      setMensagem("Digite uma informação para realizar a busca.");
      setLivrosEncontrados([]);
      setBuscaRealizada(false);
      return;
    }

    setMensagem("");

    const filtrados = listaLivros.filter((livro) => {
      const valorParaComparar =
        tipoBusca === "nome"
          ? pegarNomeLivro(livro)
          : tipoBusca === "autor"
            ? pegarAutor(livro)
            : pegarGenero(livro);

      return normalizarTexto(valorParaComparar).includes(termo);
    });

    const formatados = filtrados.map((livro) => ({
      id: livro.id || livro.idLivro,
      nome: pegarNomeLivro(livro) || "Nome não informado",
      autor: pegarAutor(livro),
      genero: pegarGenero(livro),
    }));

    setLivrosEncontrados(formatados);
    setBuscaRealizada(true);

    if (formatados.length === 0) setMensagem("Nenhum livro foi encontrado.");
  }

  function trocarTipoBusca(evento) {
    setTipoBusca(evento.target.value);
    setTermoBusca("");
    setLivrosEncontrados([]);
    setMensagem("");
    setBuscaRealizada(false);
  }

  return {
    tipoBusca,
    termoBusca,
    setTermoBusca,
    livrosEncontrados,
    mensagem,
    buscaRealizada,
    carregando: carregandoListas,
    executarBusca,
    trocarTipoBusca,
  };
}
