const db = require("../config/conexao-banco");

//listar todos os filmes
exports.listarFilmes = async (req, res) => {
  const [filmes] = await db.query("SELECT * FROM filmes");
  res.json(filmes);
};

//Cadastrar um novo filme
exports.criarFilme = async (req, res) => {
  const { titulo, descricao, duracao_min, cartaz_url } = req.body;
  await db.query(
    "INSERT INTO filmes (titulo, descricao, duracao_min, cartaz_url) VALUES (?, ?, ?, ?)",
    [titulo, descricao, duracao_min, cartaz_url]
  );
  res.status(201).json({ mensagem: "Filme criado com sucesso!" });
};

//Atualizar filme
exports.atualizarFilme = async (req, res) => {
  const { id } = req.params;
  const { titulo, descricao, duracao_min, cartaz_url } = req.body;
  await db.query(
    "UPDATE filmes SET titulo = ?, descricao = ?, duracao_min = ?, cartaz_url = ? WHERE id = ?",
    [titulo, descricao, duracao_min, cartaz_url, id]
  );
  res.json({ mensagem: "Filme atualizado com sucesso!" });
};

//Deletar filme
exports.deletarFilme = async (req, res) => {
  const { id } = req.params;
  await db.query("DELETE FROM filmes WHERE id = ?", [id]);
  res.json({ mensagem: "Filme deletado com sucesso!" });
};
