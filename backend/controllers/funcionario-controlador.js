// Função para criar um novo funcionário
const db = require('../config/conexao-banco');
const bcrypt = require('bcryptjs');

// Criar novo funcionário (admin)
exports.criarFuncionario = async (req, res) => {
  const { nome, codFunc, senha } = req.body;

  // Verifica se já existe
  const [[existe]] = await db.query('SELECT * FROM funcionario WHERE codFunc = ?', [codFunc]);
  if (existe) {
    return res.status(400).json({ erro: 'Código de funcionário já existe.' });
  }

  const senhaHash = await bcrypt.hash(senha, 10);

  await db.query(
    'INSERT INTO funcionario (nome, codFunc, senha) VALUES (?, ?, ?)',
    [nome, codFunc, senhaHash]
  );

  res.status(201).json({ mensagem: 'Funcionário criado com sucesso!' });
};

// Função para listar todos os funcionários
exports.listarFuncionarios = async (req, res) => {
  const [funcionarios] = await db.query('SELECT id, nome, codFunc FROM funcionario');
  res.json(funcionarios);
};

// Função para buscar um funcionário por ID
exports.buscarFuncionarioPorId = async (req, res) => {
  const { id } = req.params;
  const [[funcionario]] = await db.query('SELECT id, nome, codFunc FROM funcionario WHERE id = ?', [id]);

  if (!funcionario) {
    return res.status(404).json({ erro: 'Funcionário não encontrado.' });
  }

  res.json(funcionario);
};

// Função para atualizar um funcionário
exports.atualizarFuncionario = async (req, res) => {
  const { id } = req.params;
  const { nome, codFunc } = req.body;

  await db.query(
    'UPDATE funcionario SET nome = ?, codFunc = ? WHERE id = ?',
    [nome, codFunc, id]
  );

  res.json({ mensagem: 'Funcionário atualizado com sucesso!' });
};


// Função para excluir um funcionário
exports.excluirFuncionario = async (req, res) => {
  const { id } = req.params;

  await db.query('DELETE FROM funcionario WHERE id = ?', [id]);

  res.json({ mensagem: 'Funcionário excluído com sucesso!' });
};