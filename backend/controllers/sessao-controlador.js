const db = require("../config/conexao-banco");

// Gerador de cadeiras
async function gerarCadeiras(sessaoId) {
  const mapa = {
    A: 17, B: 17, C: 17, D: 17, E: 17,
    F: 17, G: 21, H: 21, I: 21, J: 21,
    K: 21, L: 21, M: 21, N: 21, O: 21,
    P: 21, Q: 15
  };

  for (const fileira in mapa) {
    const total = mapa[fileira];
    for (let i = 1; i <= total; i++) {
      const numero = `${fileira}${i.toString().padStart(2, '0')}`;
      await db.query(
        'INSERT INTO cadeiras (sessao_id, numero) VALUES (?, ?)',
        [sessaoId, numero]
      );
    }
  }
}

// listar sessões por filmes
exports.listarSessoesPorFilme = async (req, res) => {
    const {id} = req.params;
    const [sessoes] =  await db.query(
        "SELECT * FROM sessoes WHERE filme_id = ?", [id]
    );
    res.json(sessoes);
};

// criar sessão
exports.criarSessao = async(req, res) => {
    const {filme_id, data_hora, sala} = req.body;

    const [result] = await db.query(
        "INSERT INTO sessoes (filme_id, data_hora, sala) VALUES (?, ?, ?)",
        [filme_id, data_hora, sala]
    );

    const novaSessaoId = result.insertId;
    await gerarCadeiras(novaSessaoId);

    res.status(201).json({ id: novaSessaoId, mensagem: "Sessão criada com sucesso!" });
};

// atualizar sessão
exports.atualizarSessao = async (req, res) => {
    const { id } = req.params;
    const { filme_id, data_hora, sala } = req.body;

    await db.query(
        "UPDATE sessoes SET filme_id = ?, data_hora = ?, sala = ? WHERE id = ?",
        [filme_id, data_hora, sala, id]
    );

    res.json({ mensagem: "Sessão atualizada com sucesso!" });
};

// deletar sessão
exports.deletarSessao = async (req, res) =>{
    const { id } = req.params;

    await db.query("DELETE FROM sessoes WHERE id = ?", [id]);
    res.json({ mensagem: "Sessão deletada com sucesso!" })
};
