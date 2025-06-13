// Importando os módulos necessários
const express = require('express');
const cors = require('cors');

// Importando o módulo dotenv para carregar variáveis de ambiente
require('dotenv').config();


// Importando o módulo express para criar o servidor
const app = express();

// Configurando o middleware CORS para permitir requisições de diferentes origens
app.use(cors());
app.use(express.json());

// Importando as rotas
const rotasAutenticacao = require("./routes/rotas-autenticacao");
const rotasFilmes = require("./routes/rotas-filmes");
const rotasFuncionarios = require("./routes/rotas-funcionario");

// Definindo as rotas do servidor
app.use('/api/auth', rotasAutenticacao);
app.use('/api/filmes', rotasFilmes);
app.use('/api/funcionarios', rotasFuncionarios);


// Definindo a rota raiz
const PORTA = process.env.PORT || 3001;
app.listen(PORTA, () => {
  console.log(`Servidor rodando na porta ${PORTA}`);
});
