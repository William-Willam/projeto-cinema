const db = require("../config/conexao-banco");

//pagamento online ou no toten
exports.pagamentoOnlineouTotem = async (req, res) => {
  const { ingresso_id, tipo, valor } = req.body;

  if (!["pix", "cartao"].includes(tipo)) {
    return res
      .status(400)
      .json({ message: "Tipo de pagamento inválido. Use 'pix' ou 'cartao'." });
  }

  await db.query(
    "INSERT INTO pagamento (ingresso_id, tipo, origem, valor) VALUES (?, ?, ?, ?)",
    [ingresso_id, tipo, "online", valor]
  );

  res.status(201).json({
    message: "Pagamento realizado com sucesso.",
    pagamento: { ingresso_id, tipo, origem: "online", valor },
  });
};

// Pagamento no balcão (funcionário autenticado)
exports.pagamentoBalcao = async (req, res) => {
  const { ingresso_id, tipo, valor } = req.body;
  const funcionario_id = req.usuario.id;

  if (!["pix", "cartao", "dinheiro"].includes(tipo)) {
    return res.status(400).json({ erro: "Tipo de pagamento inválido." });
  }

  await db.query(
    "INSERT INTO pagamento (ingresso_id, tipo, origem, valor, funcionario_id) VALUES (?, ?, ?, ?, ?)",
    [ingresso_id, tipo, "balcao", valor, funcionario_id]
  );

  res
    .status(201)
    .json({ mensagem: "Pagamento no balcão registrado com sucesso!" });
};

// Listar todos os pagamentos (admin ou funcionário)
exports.listarPagamentos = async (req, res) => {
  const [dados] = await db.query(`
    SELECT 
      p.id AS pagamento_id,
      p.tipo,
      p.origem,
      p.valor,
      p.pago_em,
      i.id AS ingresso_id,
      i.nome_cliente,
      f.titulo AS filme,
      s.data_hora,
      c.numero AS cadeira,
      func.nome AS atendente
    FROM pagamento p
    JOIN ingressos i ON p.ingresso_id = i.id
    JOIN sessoes s ON i.sessao_id = s.id
    JOIN filmes f ON s.filme_id = f.id
    JOIN cadeiras c ON i.cadeira_id = c.id
    LEFT JOIN funcionario func ON p.funcionario_id = func.id
    ORDER BY p.pago_em DESC
  `);

  res.json(dados);
};
