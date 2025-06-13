const express = require("express");
const router = express.Router();
const autenticar = require("../middlewares/autenticador");
const {
  criarFuncionario,
  listarFuncionarios,
  buscarFuncionarioPorId,
  atualizarFuncionario,
  excluirFuncionario,
} = require("../controllers/funcionario-controlador");

// Apenas admin pode fazer o CRUD do funcionário
router.post("/", autenticar("admin"), criarFuncionario);
router.get("/", autenticar("admin"), listarFuncionarios);
router.get("/:id", autenticar("admin"), buscarFuncionarioPorId);
router.put("/:id", autenticar("admin"), atualizarFuncionario);
router.delete("/:id", autenticar("admin"), excluirFuncionario);

module.exports = router;
