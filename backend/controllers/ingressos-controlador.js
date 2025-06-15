const db = require('../config/conexao-banco');

// Listar todos os ingressos (admin ou funcionário)
exports.listarIngressos = async (req, res) => {
  const { filme_id, sessao_id, data } = req.query;

  let sql = `
    SELECT 
      i.id AS ingresso_id,
      i.nome_cliente,
      i.criado_em,
      f.titulo AS filme,
      s.data_hora,
      s.sala,
      c.numero AS cadeira
    FROM ingressos i
    JOIN sessoes s ON i.sessao_id = s.id
    JOIN filmes f ON s.filme_id = f.id
    JOIN cadeiras c ON i.cadeira_id = c.id
    WHERE 1 = 1
  `;
  const params = [];

  if (filme_id) {
    sql += ' AND f.id = ?';
    params.push(filme_id);
  }

  if (sessao_id) {
    sql += ' AND s.id = ?';
    params.push(sessao_id);
  }

  if (data) {
    sql += ' AND DATE(s.data_hora) = ?';
    params.push(data);
  }

  sql += ' ORDER BY i.criado_em DESC';

  const [ingressos] = await db.query(sql, params);
  res.json(ingressos);
};
