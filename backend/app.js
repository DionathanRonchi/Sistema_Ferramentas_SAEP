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

// CADASTRAR PRODUTO
server.post('/produtos', (req, res) => {
    const { nome, cor, textura, peso, unidade_medida, aplicacao, aplicação, data_validade,
        estoque_minimo, estoque_atual, preco_unitario, id_categoria } = req.body;

    const aplicacaoFinal = aplicacao ?? aplicação;

    if (nome == null) {
        return res.status(400).json({ error: 'O campo nome é obrigatório' });
    }

    if (cor == null || textura == null || peso == null || unidade_medida == null || aplicacaoFinal == null || data_validade == null || estoque_minimo == null || estoque_atual == null || preco_unitario == null || id_categoria == null) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    const sql = 'INSERT INTO PRODUTO (NOME, COR, TEXTURA, PESO, UNIDADE_MEDIDA, APLICACAO, DATA_VALIDADE, ESTOQUE_MINIMO, ESTOQUE_ATUAL, PRECO_UNITARIO, ID_CATEGORIA) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

    connection.query(sql, [nome, cor, textura, peso, unidade_medida, aplicacaoFinal, data_validade, estoque_minimo, estoque_atual, preco_unitario, id_categoria], (err, resultados) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        return res.status(201).json({
            id: resultados.insertId,
            nome,
            cor,
            textura,
            peso,
            unidade_medida,
            aplicacao: aplicacaoFinal,
            data_validade,
            estoque_minimo,
            estoque_atual,
            preco_unitario,
            id_categoria
        });
    });
});

// ATUALIZAR PRODUTO
server.put('/produtos/:id', (req, res) => {
    const { id } = req.params;
    const { nome, cor, textura, peso, unidade_medida, aplicacao, aplicação, data_validade,
        estoque_minimo, estoque_atual, preco_unitario, id_categoria } = req.body;
    const aplicacaoFinal = aplicacao ?? aplicação;

    if (nome == null || cor == null || textura == null || peso == null || unidade_medida == null ||
        aplicacaoFinal == null || data_validade == null || estoque_minimo == null || estoque_atual == null ||
        preco_unitario == null || id_categoria == null) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    const sql = 'UPDATE PRODUTO SET NOME = ?, COR = ?, TEXTURA = ?, PESO = ?, UNIDADE_MEDIDA = ?, APLICACAO = ?, DATA_VALIDADE = ?, ESTOQUE_MINIMO = ?, ESTOQUE_ATUAL = ?, PRECO_UNITARIO = ?, ID_CATEGORIA = ? WHERE id_produto = ?';
    connection.query('SELECT id_produto FROM PRODUTO WHERE id_produto = ?', [id], (err, produtos) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (produtos.length === 0) {
            return res.status(404).json({ error: 'Produto não encontrado' });
        }

        connection.query(sql, [nome, cor, textura, peso, unidade_medida, aplicacaoFinal, data_validade, estoque_minimo,
            estoque_atual, preco_unitario, id_categoria, id], (err) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            return res.json({ message: 'Produto atualizado com sucesso' });
        });
    });
});


const PORT = 3025;
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
