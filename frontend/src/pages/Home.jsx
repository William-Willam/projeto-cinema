// importação do biblioteca do react
import { useEffect, useState } from "react";

// importação do api
import api from "../service/api";

export default function Home() {
  // Variavel Filmes
  const [filmes, setFilmes] = useState([]);

  //Mudança de estados
  useEffect(() => {
    api
      .get("/filmes")
      .then((res) => setFilmes(res.data))
      .catch((err) => console.error("Erro ao buscar filmes: ", err));
  }, []);

  // retorno das informações
  return (
    <main style={{ padding: "20px" }}>
      <h1>Filmes em Cartaz</h1>
      {filmes.length === 0 ? (
        <p>Nenhum filme disponível.</p>
      ) : (
        <ul>
          {filmes.map((filme) => (
            <li key={filme.id}>{filme.titulo}</li>
          ))}
        </ul>
      )}
    </main>
  );
}
