const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const rotasAutenticacao = require("./routes/rotas-autenticacao");
app.use('/api/auth', rotasAutenticacao);

const PORTA = process.env.PORT || 3001;
app.listen(PORTA, () => {
  console.log(`Servidor rodando na porta ${PORTA}`);
});
