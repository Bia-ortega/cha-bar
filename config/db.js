const mysql = require('mysql2');
require('dotenv').config();

const db_config = {
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE
};

let connection;

function handleDisconnect() {
  connection = mysql.createConnection(db_config);

  connection.connect(err => {
    if (err) {
      console.error('Erro ao conectar no MySQL:', err);
      setTimeout(handleDisconnect, 2000); // tenta reconectar em 2s
    } else {
      console.log('MySQL conectado com sucesso!');
    }
  });

  connection.on('error', err => {
    console.error('Erro de conexão MySQL:', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.log('Tentando reconectar ao MySQL...');
      handleDisconnect();
    } else {
      throw err;
    }
  });
}

handleDisconnect();

// Exporta a função que retorna a conexão sempre atualizada
module.exports = () => connection;