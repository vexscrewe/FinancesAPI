const db = require('../db');

exports.criarTarefa = async (req, res) => {
    const { titulo, descricao } = req.body;
    try {
        const resultado = await db.query(
        'INSERT INTO tarefas (titulo, descricao) VALUES ($1, $2) RETURNING *',
        [titulo, descricao]
        );
    res.status(201).json(resultado.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ erro: 'Erro ao criar tarefa' });
    }
};

exports.listarTarefas = async (req, res) => {
    try {
    const resultado = await db.query('SELECT * FROM tarefas ORDER BY id');
    res.json(resultado.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ erro: 'Erro ao listar tarefas' });
    }
};

exports.atualizarTarefa = async (req, res) => {
    const { id } = req.params;
    const { titulo, descricao, concluida } = req.body;
    try {
        const resultado = await db.query(
        'UPDATE tarefas SET titulo = $1, descricao = $2, concluida = $3 WHERE id = $4 RETURNING*',
        [titulo, descricao, concluida, id]
    );

    if (resultado.rows.length === 0) {
        return res.status(404).json({ erro: 'Tarefa nao encontrada' });
    }

    res.json(resultado.rows[0]);
        } catch (err) {
        console.error(err);
        res.status(500).json({ erro: 'Erro ao atualizar tarefa' });
        }
    }

exports.deletarTarefa = async (req, res) => {
    const { id } = req.params;
    try {
        const resultado = await db.query(
        'DELETE FROM tarefas WHERE id = $1 RETURNING *',
        [id]
    );

    if (resultado.rows.length === 0) {
        return res.status(404).json({ erro: 'Tarefa nao encontrada' });
    }

    res.json({ mensagem: 'Tarefa deletada com sucesso' });
    } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao deletar tarefa' });
    }
};
