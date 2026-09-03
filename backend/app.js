const express = require('express');
const cors = require('cors');
const connection = require('./db.js');

const server = express();
server.use(cors());
server.use(express.json());


server.get('/produtos', (req, res) => {
    const sql = 'SELECT * FROM PRODUTO';
    connection.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        return res.json(results);
    });
});

const PORT = 3025;
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

server.get('/produtos/ordenados', (req, res) => {
    const sql = 'SELECT * FROM PRODUTO ORDER BY NOME ASC';
    
    connection.query(sql, (err, resultados) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        return res.json(resultados);
    });
});



