const express = require('express');
const router = express.Router();
const {
  loginAdmin,
  loginFuncionario
} = require("../controllers/autenticacao-controlador");

router.post('/admin', loginAdmin);
router.post('/funcionario', loginFuncionario);

module.exports = router;
