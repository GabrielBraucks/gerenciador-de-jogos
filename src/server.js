require('dotenv').config;
const express = require('exprees');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes

// Middleware Global
app.use((err, req, res, next) => {
    console.log('---------ERRO---------');
    
    console.error(err.stack);

    console.log('----------------------');
    res.status(500).json({ error: 'Erro interno do servidor' });
});

const PORT = process.env.PORT || 3333;
const HOST = process.env.HOST || '127.0.0.1';

app.listen(PORT, HOST, () => {
    console.log(`http://${HOST}:${PORT}`);
});