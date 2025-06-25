// cinema-backend/config/db.js
require('dotenv').config(); // Carrega as variáveis do .env

const mysql = require('mysql2/promise'); // Usamos a versão 'promise' para async/await

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

async function testConnection() {
    try {
        const connection = await pool.getConnection();
        console.log('Conexão com o banco de dados MySQL estabelecida com sucesso!');
        connection.release(); // Libera a conexão de volta para o pool
    } catch (error) {
        console.error('Erro ao conectar ao banco de dados MySQL:', error.message);
        process.exit(1); // Encerra a aplicação se a conexão falhar
    }
}

module.exports = {
    pool,
    testConnection
};