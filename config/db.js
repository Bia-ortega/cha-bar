const mysql = require('mysql2');
require('dotenv').config();

const db_config = {
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
};

let connection;

function handleDisconnect() {
  connection = mysql.createConnection(db_config);

  connection.connect(err => {
    if (err) {
      console.error('Erro ao conectar no MySQL:', err);
      setTimeout(handleDisconnect, 2000); // tenta reconectar em 2 segundos
    } else {
      console.log('MySQL conectado com sucesso!');
    }
  });

  // Tratamento de erros na conexão
  connection.on('error', err => {
    console.error('Erro de conexão MySQL:', err);

    // Reconecta em caso de perda de conexão ou timeout
    if (
      err.code === 'PROTOCOL_CONNECTION_LOST' ||
      err.code === 'ECONNRESET' ||
      err.code === 'ETIMEDOUT' ||
      err.fatal === true
    ) {
      console.log('Tentando reconectar ao MySQL...');
      handleDisconnect();
    } else {
      throw err;
    }
  });

  // Ping periódico para manter a conexão ativa
  setInterval(() => {
    if (connection && connection.state !== 'disconnected') {
      connection.query('SELECT 1', err => {
        if (err) console.error('Erro no ping MySQL:', err);
      });
    }
  }, 5000); // a cada 5 segundos
}

// Inicia a primeira conexão
handleDisconnect();

// Exporta a função que retorna a conexão sempre atualizada
module.exports = () => connection;
