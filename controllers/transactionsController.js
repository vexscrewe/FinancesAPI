// aponte para onde está o seu db.js
const pool = require('../db');


exports.createTransaction = async (req, res) => {
  const { title, amount, category, date } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO transactions (title, amount, category, date)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [title, amount, category, date]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao criar transação' });
  }
};

exports.listTransactions = async (_req, res) => {
  try {
    const result = await pool.query('SELECT * FROM transactions ORDER BY date');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao listar transações' });
  }
};

exports.updateTransaction = async (req, res) => {
  const { id } = req.params;
  const { title, amount, category, date } = req.body;
  try {
    const result = await pool.query(
      `UPDATE transactions
       SET title=$1, amount=$2, category=$3, date=$4
       WHERE id=$5 RETURNING *`,
      [title, amount, category, date, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Transação não encontrada' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao atualizar transação' });
  }
};

exports.deleteTransaction = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM transactions WHERE id=$1', [id]);
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao deletar transação' });
  }
};