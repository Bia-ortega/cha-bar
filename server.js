const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const app = express();

const presenteRoutes = require('./routes/presenteRoutes');

app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            fontSrc: ["'self'", 'https:', 'data:', 'fonts.googleapis.com', 'fonts.gstatic.com'],
            styleSrc: ["'self'", 'https:', "'unsafe-inline'"],
            imgSrc: ["'self'", 'data:', 'https:']
        }
    }
}));

app.use(cors());
app.use(express.json());

// Serve o frontend da pasta /public
app.use(express.static(path.join(__dirname, 'public')));

// Rota principal (serve index.html direto)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API
app.use('/presentes', presenteRoutes);

// Porta padrão
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}, http://localhost:${PORT}`);
});
