const mysql = require('mysql2');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

// Railway: basta definir MYSQL_URL=${{MySQL.MYSQL_URL}}. Localmente usa as variáveis DB_*
const config = process.env.MYSQL_URL
    ? { uri: process.env.MYSQL_URL }
    : {
        host:process.env.DB_HOST,
        user:process.env.DB_USER,
        password:process.env.DB_PASSWORD,
        database:process.env.DB_NAME,
        port:process.env.DB_PORT,
    };

// Pool reabre conexões que caírem (necessário em hospedagem na nuvem)
const connection = mysql.createPool({
    ...config,
    waitForConnections: true,
    connectionLimit: 10,
    enableKeepAlive: true
});

// Cria as tabelas (se ainda não existirem) a partir de db/tabelas.sql
async function criarTabelas() {
    const sql = fs.readFileSync(path.join(__dirname, 'db', 'tabelas.sql'), 'utf8');
    const comandos = sql
        .split(';')
        .map((c) => c.replace(/^\s*--.*$/gm, '').trim())
        .filter(Boolean);

    for (const comando of comandos) {
        await connection.promise().query(comando);
    }
}

//testar a conexão com o banco de dados (tenta de novo se o banco ainda estiver iniciando)
function conectar(tentativa = 1) {
    criarTabelas()
        .then(() => console.log("Conexão bem-sucedida ao banco de dados (tabelas prontas)"))
        .catch((err) => {
            console.error(`Erro ao conectar ao banco de dados (tentativa ${tentativa}):`, err.code || err.message);
            if (tentativa < 10) setTimeout(() => conectar(tentativa + 1), 5000);
        });
}
conectar();

module.exports = connection;
