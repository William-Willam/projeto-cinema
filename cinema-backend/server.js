// cinema-backend/server.js
const express = require('express');
const cors = require('cors');
const { testConnection } = require('./config/db'); // Importa a função de teste de conexão

const app = express();
const PORT = process.env.PORT || 3001; // Pega a porta do .env ou usa 3001

// Middleware
app.use(cors()); // Habilita o CORS para permitir requisições do frontend
app.use(express.json()); // Habilita o Express para parsear JSON no corpo das requisições

// Rota de teste
app.get('/', (req, res) => {
    res.send('API do Sistema de Cinema funcionando!');
});

// Testar a conexão com o banco de dados ao iniciar
testConnection().then(() => {
    // Iniciar o servidor Express apenas se a conexão com o DB for bem-sucedida
    app.listen(PORT, () => {
        console.log(`Servidor backend rodando na porta ${PORT}`);
    });
});

// Em breve: importar e usar as rotas (ex: app.use('/api/filmes', require('./routes/filmes')));