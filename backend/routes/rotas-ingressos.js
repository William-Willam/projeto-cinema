const express = require('express');
const router = express.Router();

// Importa o controlador de ingressos
const {listarlistarIngressos} = require("../controllers/ingressos-controlador");

// autenticação de middleware
const autenticar = require("../middlewares/autenticador");

// Rota para listar ingressos(admin)
router.get("/ingressos", autenticar("admin"), listarlistarIngressos);

// Rota para listar ingressos(funcionário)
router.get("/ingressos/funcionario", autenticar("funcionario"), listarlistarIngressos);

// exporta o roteador
module.exports = router;
