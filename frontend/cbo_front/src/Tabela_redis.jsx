import { useState, useEffect } from "react";
import api from "./api/requisicoes";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Tabela_redis() {
  const [dados, setDados] = useState([]);
  const [pesquisa, setPesquisa] = useState("");
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [tempoDeCarregamento, setTempoDeCarregamento] = useState(null);
  const itensPorPagina = 10;

  useEffect(() => {
    const buscarDados = async () => {
      const inicio = performance.now();
      try {
        const resposta = await api.get("/cbo_ocupacao");
        setDados(resposta.data);
      } catch (erro) {
        console.error("Erro ao buscar dados:", erro);
      }
      const fim = performance.now();
      const tempo = fim - inicio;
      setTempoDeCarregamento(tempo.toFixed(2));
    };

    buscarDados();
  }, []);

  const dadosFiltrados = dados.filter((item) =>
    item.titulo.toLowerCase().includes(pesquisa.toLowerCase())
  );

  const totalDePaginas = Math.ceil(dadosFiltrados.length / itensPorPagina);
  const dadosPaginados = dadosFiltrados.slice(
    (paginaAtual - 1) * itensPorPagina,
    paginaAtual * itensPorPagina
  );

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-lg mx-auto" style={{ maxWidth: "600px" }}>
        <h2 className="text-center mb-3">REDIS</h2>
        <form className="mb-3">
          <div className="form-group">
            <label htmlFor="pesquisa">Pesquisar título:</label>
            <input
              type="text"
              id="pesquisa"
              className="form-control"
              placeholder="Digite para pesquisar..."
              value={pesquisa}
              onChange={(e) => setPesquisa(e.target.value)}
            />
          </div>
        </form>

        {tempoDeCarregamento && (
          <div className="alert alert-info" role="alert">
            Tempo de Carregamento: {tempoDeCarregamento} ms
          </div>
        )}
      </div>

      <table className="table table-bordered table-striped mt-4 card p-4 shadow-lg mx-auto" style={{ maxWidth: "600px" }}>
        <thead className="thead-dark align-self-center">
          <tr>
            <th className="border border-gray-300 p-2">ID</th>
            <th className="border border-gray-300 p-2">Título</th>
          </tr>
        </thead>
        <tbody>
          {dadosPaginados.map((item) => (
            <tr key={item.id}>
              <td className="border border-gray-300 p-2">{item.id}</td>
              <td className="border border-gray-300 p-2">{item.titulo}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="d-flex justify-content-between mt-3 card p-4 shadow-lg mx-auto" style={{ maxWidth: "600px" }} >
        <button
          disabled={paginaAtual === 1}
          onClick={() => setPaginaAtual(paginaAtual - 1)}
          className="btn btn-primary text-center mb-3"
        >
          Anterior
        </button>
        <span className="align-self-center">Página {paginaAtual} de {totalDePaginas}</span>
        <button
          disabled={paginaAtual === totalDePaginas}
          onClick={() => setPaginaAtual(paginaAtual + 1)}
          className="btn btn-primary text-center mb-3"
        >
          Próximo
        </button>
      </div>
    </div>
  );
}

