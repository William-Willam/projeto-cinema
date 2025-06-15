const express = require('express');
const router = express.Router();

// Importa o controlador de reservas
const { reservarCadeiras } = require("../controllers/reservas-controlador");

// Rota para reservar cadeiras
router.post('/reservar', reservarCadeiras);

// Exporta o roteador para uso em outros módulos
module.exports = router;
