const db = require("../config/conexao-banco");

// Reservar uma ou mais cadeiras
exports.reservarCadeiras = async (req, res) => {
  const { sessao_id, nome_cliente, cadeiras_ids } = req.body;

  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    // Verifica se todas as cadeiras ainda estão disponíveis
    const [verificacao] = await conn.query(
      `SELECT id FROM cadeiras 
       WHERE id IN (?) AND sessao_id = ? AND status = 'disponivel'`,
      [cadeiras_ids, sessao_id]
    );

    if (verificacao.length !== cadeiras_ids.length) {
      await conn.rollback();
      return res
        .status(400)
        .json({ erro: "Uma ou mais cadeiras já estão reservadas ou em uso." });
    }

    // Atualiza cadeiras para "processando"
    await conn.query(
      `UPDATE cadeiras SET status = 'processando' WHERE id IN (?)`,
      [cadeiras_ids]
    );

    const ingressos = [];

    // Cria ingressos e marca cadeiras como "reservada"
    for (const cadeiraId of cadeiras_ids) {
      const [result] = await conn.query(
        `INSERT INTO ingressos (sessao_id, cadeira_id, nome_cliente) VALUES (?, ?, ?)`,
        [sessao_id, cadeiraId, nome_cliente]
      );

      await conn.query(
        `UPDATE cadeiras SET status = 'reservada' WHERE id = ?`,
        [cadeiraId]
      );

      ingressos.push({ ingresso_id: result.insertId, cadeira_id: cadeiraId });
    }

    await conn.commit();

    res.status(201).json({
      mensagem: "Reserva realizada com sucesso!",
      ingressos,
    });
  } catch (error) {
    await conn.rollback();
    res
      .status(500)
      .json({ erro: "Erro ao reservar as cadeiras", detalhes: error.message });
  } finally {
    conn.release();
  }
};


// Reserva feita no balcão (funcionário autenticado)
exports.reservarCadeirasBalcao = async (req, res) => {
  const { sessao_id, nome_cliente, cadeiras_ids } = req.body;
  const funcionario_id = req.usuario.id;

  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    // Verifica se todas estão disponíveis
    const [verificacao] = await conn.query(
      `SELECT id FROM cadeiras 
       WHERE id IN (?) AND sessao_id = ? AND status = 'disponivel'`,
      [cadeiras_ids, sessao_id]
    );

    if (verificacao.length !== cadeiras_ids.length) {
      await conn.rollback();
      return res
        .status(400)
        .json({ erro: "Cadeiras já reservadas ou em uso." });
    }

    // Atualiza para "processando"
    await conn.query(
      `UPDATE cadeiras SET status = 'processando' WHERE id IN (?)`,
      [cadeiras_ids]
    );

    const ingressos = [];

    // Cria ingressos e atualiza status
    for (const cadeiraId of cadeiras_ids) {
      const [result] = await conn.query(
        `INSERT INTO ingressos (sessao_id, cadeira_id, nome_cliente) VALUES (?, ?, ?)`,
        [sessao_id, cadeiraId, nome_cliente]
      );

      await conn.query(
        `UPDATE cadeiras SET status = 'reservada' WHERE id = ?`,
        [cadeiraId]
      );

      ingressos.push({ ingresso_id: result.insertId, cadeira_id: cadeiraId });
    }

    await conn.commit();

    res.status(201).json({
      mensagem: "Reserva no balcão realizada com sucesso!",
      funcionario_id,
      ingressos,
    });
  } catch (error) {
    await conn.rollback();
    res
      .status(500)
      .json({ erro: "Erro ao reservar (balcão)", detalhes: error.message });
  } finally {
    conn.release();
  }
};
