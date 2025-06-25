const db = require('../config/db');

// Listar todos os presentes
const listarPresentes = (req, res) => {
    const sql = 'SELECT * FROM presentes';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Erro ao listar presentes:', err); // 👈 Log de erro
            return res.status(500).json({ error: err });
        }
        console.log('Presentes encontrados:', results.length); // 👈 Log de sucesso
        res.status(200).json(results);
    });
};

// Reservar um presente
const reservarPresente = (req, res) => {
    const id = req.params.id;
    const sql = 'UPDATE presentes SET reservado = 1 WHERE id = ?';

    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err });

        if (result.affectedRows === 0) {
            return res.status(404).json({ mensagem: 'Presente não encontrado' });
        }

        res.status(200).json({ mensagem: 'Presente reservado com sucesso!' });
    });
};

const desmarcarPresente = (req, res) => {
    const id = req.params.id;
    const sql = 'UPDATE presentes SET reservado = 0 WHERE id = ?';

    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err });

        if (result.affectedRows === 0) {
            return res.status(404).json({ mensagem: 'Presente não encontrado' });
        }

        res.status(200).json({ mensagem: 'Presente desmarcado com sucesso!' });
    });
};




// (Opcional) Resetar reservas
const resetarPresentes = (req, res) => {
    const sql = 'UPDATE presentes SET reservado = 0';
    db.query(sql, (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.status(200).json({ mensagem: 'Todos os presentes resetados!' });
    });
};

module.exports = {
    listarPresentes,
    reservarPresente,
    resetarPresentes,
    desmarcarPresente 
};
