const express = require('express');
const router = express.Router();

// Importando os controladores de autenticação
const {
  loginAdmin,
  loginFuncionario
} = require("../controllers/autenticacao-controlador");

// Rota para login de administrador
router.post('/admin', loginAdmin);

// Rota para login de funcionário
router.post('/funcionario', loginFuncionario);

// Exportando o roteador
module.exports = router;
