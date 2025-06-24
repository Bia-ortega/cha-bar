const express = require('express');
const router = express.Router();
const presenteController = require('../controllers/presenteController');

// Rotas
router.get('/', presenteController.listarPresentes);
router.post('/reservar/:id', presenteController.reservarPresente);
router.post('/resetar', presenteController.resetarPresentes); // opcional p/ testes
router.post('/desmarcar/:id', presenteController.desmarcarPresente);

module.exports = router;


