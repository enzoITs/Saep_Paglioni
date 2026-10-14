const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

// Pool reabre conexões que caírem (necessário em hospedagem na nuvem)
const connection = mysql.createPool({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
    port:process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    enableKeepAlive: true
});

//testar a conexão com o banco de dados
connection.getConnection((err, conn) => {
    if (err) {
        console.error("Erro ao conectar ao banco de dados:", err);
        return;
    } else {
        console.log("Conexão bem-sucedida ao banco de dados");
        conn.release();
    }
});

module.exports = connection;
