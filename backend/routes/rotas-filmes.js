const express = require("express");
const router = express.Router();

// Middleware de autenticação
const autenticar = require("../middlewares/autenticador");

// Importando os controladores de filmes
const{
    listarFilmes,
    criarFilme,
    atualizarFilme,
    deletarFilme
} = require("../controllers/filmes-controlador");

// Rota para listar todos os filmes
router.get("/",listarFilmes);

// Rota para criar um novo filme
router.post("/", autenticar, criarFilme);

// Rota para atualizar um filme existente
router.put("/:id", autenticar, atualizarFilme);

// Rota para deletar um filme
router.delete("/:id", autenticar, deletarFilme);

// Exportando o roteador
module.exports = router;