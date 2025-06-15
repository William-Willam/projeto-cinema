const db = require('../config/conexao-banco');

// Listar cadeiras de uma sessão
exports.listarCadeirasPorSessao = async (req, res) => {
  const { id } = req.params;

  const [cadeiras] = await db.query(
    'SELECT id, numero, status FROM cadeiras WHERE sessao_id = ? ORDER BY numero',
    [id]
  );

  res.json(cadeiras);
};
