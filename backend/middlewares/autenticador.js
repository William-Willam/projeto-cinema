const jwt = require('jsonwebtoken');
require('dotenv').config();

function autenticar(tipoPermitido) {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ erro: 'Token não fornecido' });

    jwt.verify(token, process.env.JWT_SECRET, (err, usuario) => {
      if (err || usuario.tipo !== tipoPermitido) {
        return res.status(403).json({ erro: 'Acesso negado' });
      }
      req.usuario = usuario;
      next();
    });
  };
}

module.exports = autenticar;
