const express = require('express');
const router = express.Router();

// Importa o middleware de autenticação
const { autenticar } = require("../middlewares/autenticacao");

// Importa o controlador de reservas
const { reservarCadeiras } = require("../controllers/reservas-controlador");

// Rota para reservar cadeiras

//Por meio do cliente, sem ir ao balcão
router.post('/reservar', reservarCadeiras);

// Cliente indo ao balcão
router.post('/reservar/balcao', autenticar("funcionario"), reservarCadeiras);

// Exporta o roteador para uso em outros módulos
module.exports = router;
