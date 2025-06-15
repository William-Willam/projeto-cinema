const express = require("express");
const router = express.Router();

// Middleware de autenticação
const autenticar = require("../middlewares/autenticador");

// Importando os controladores de sessão
const {
    listarSessoesPorFilme,
    criarSessao,
    atualizarSessao,
    deletarSessao
} = require("../controllers/sessao-controlador");

// Rota para listar sessões por filme

// para os clientes
router.get("/filme/:id/sessoes", listarSessoesPorFilme);

// somente para administradores
router.post("/sessoes", autenticar("admin"), criarSessao);
router.put("/sessoes/:id", autenticar("admin"), atualizarSessao);
router.delete("/sessoes/:id", autenticar("admin"), deletarSessao);

// Exportando o roteador
module.exports = router;