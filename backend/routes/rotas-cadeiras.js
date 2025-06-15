const express = require("express");
const router = express.Router();

// Importa o controlador de rotas
const {listarCadeirasPorSessao} = require("../controllers/cadeiras-controlador");

// Define a rota para listar cadeiras de uma sessão
router.get('/sessoes/:id/cadeiras', listarCadeirasPorSessao);

// Exporta o roteador
module.exports = router;