const mysql = require('mysql2');

require('dotenv').config(); // 👈 necessário!

const db = mysql.createConnection({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE
});

db.connect(err => {
    if (err) {
        console.error('Erro ao conectar no MySQL:', err);
    } else {
        console.log('MySQL conectado com sucesso!');
    }
});

module.exports = db;
