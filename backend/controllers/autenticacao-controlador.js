const db = require('../config/conexao-banco');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

function gerarToken(usuario) {
  return jwt.sign(usuario, process.env.JWT_SECRET, { expiresIn: '1h' });
}

exports.loginAdmin = async (req, res) => {
  const { codAdmin, senha } = req.body;
  const [[admin]] = await db.query('SELECT * FROM admin WHERE codAdmin = ?', [codAdmin]);

  if (!admin || !(await bcrypt.compare(senha, admin.senha))) {
    return res.status(401).json({ erro: 'Credenciais inválidas' });
  }

  const token = gerarToken({ id: admin.id, tipo: 'admin' });
  res.json({ token });
};

exports.loginFuncionario = async (req, res) => {
  const { codFunc, senha } = req.body;
  const [[func]] = await db.query('SELECT * FROM funcionario WHERE codFunc = ?', [codFunc]);

  if (!func || !(await bcrypt.compare(senha, func.senha))) {
    return res.status(401).json({ erro: 'Credenciais inválidas' });
  }

  const token = gerarToken({ id: func.id, tipo: 'funcionario' });
  res.json({ token });
};
