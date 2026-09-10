const express = require('express');
const cors = require('cors');
const connection = require('./db.js');

const server = express();
server.use(cors());
server.use(express.json());

// Middleware para debug
server.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    next();
});


// ROTA GET / TODOS PRODUTOS
server.get('/produtos', (req, res) => {
    const sql = 'SELECT * FROM PRODUTO';
    connection.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        return res.json(results);
    });
});

// ROTA GET / PRODUTOS ORDENADOS
server.get('/produtos/ordenados', (req, res) => {
    const sql = 'SELECT * FROM PRODUTO ORDER BY NOME ASC';
    
    connection.query(sql, (err, resultados) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        return res.json(resultados);
    });
});

// ROTA GET / BUSCAR PRODUTO POR NOME
server.get('/produtos/buscar/:nome', (req, res) => {
    const { nome } = req.params;
    const sql = 'SELECT * FROM PRODUTO WHERE NOME LIKE ?';
    
    connection.query(sql, [`%${nome}%`], (err, resultados) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        return res.json(resultados);
    });
});

// ROTA GET / PRODUTO POR ID
server.get('/produtos/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM PRODUTO WHERE id_produto = ?';
    
    connection.query(sql, [id], (err, resultados) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (resultados.length === 0) {
            return res.status(404).json({ error: 'Produto não encontrado' });
        }
        return res.json(resultados[0]);
    });
});

const PORT = 3025;
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
