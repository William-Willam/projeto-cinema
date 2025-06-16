const express = require('express');
const router = express.Router();

// Importa o controlador de ingressos
const {listarIngressos} = require("../controllers/ingressos-controlador");

// autenticação de middleware
const autenticar = require("../middlewares/autenticador");

// Rota para listar ingressos(admin)
router.get("/ingressos", autenticar("admin"), listarIngressos);

// Rota para listar ingressos(funcionário)
router.get("/ingressos/funcionario", autenticar("funcionario"), listarIngressos);

// exporta o roteador
module.exports = router;
