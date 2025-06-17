const express = require("express");
const router = express.Router();

// Importar o controlador de pagamentos
const {
  pagamentoOnlineouTotem,
  pagamentoBalcao,
  listarPagamentos,
} = require("../controllers/pagamento-controlador");

//Autenticação
const autenticar = require("../middlewares/autenticador");

/* Rota para pagamento online ou no totem */

// cliente sem autenticação
router.post("/pagamentos/online-ou-totem", pagamentoOnlineouTotem);

// Rota para pagamento no balcão (funcionário autenticado)
router.post("/pagamentos/balcao", autenticar("funcionario"), pagamentoBalcao);

/* Rota para listar todos os pagamentos (admin ou funcionário) */
router.get("/pagamentos", autenticar("admin"), listarPagamentos);
router.get("/pagamentos", autenticar("funcionario"), listarPagamentos);

// Exportar o roteador
module.exports = router;
