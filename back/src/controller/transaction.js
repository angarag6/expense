import { pool } from "../../db.js";

const getTransactions = async (req, res) => {
  const userId = req.query.user_id;

  try {
    const queryText = `
      SELECT t.*, c.name
      FROM transactions t
      INNER JOIN category c ON t.category_id = c.id
      WHERE c.user_id = $1
    `;
    const response = await pool.query(queryText, [userId]);
    res.json(response.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const getOneTransaction = async (req, res) => {
  const { id } = req.params;
  try {
    const queryText = `SELECT * FROM transactions WHERE id = $1`;
    const response = await pool.query(queryText, [id]);
    res.send(response.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createTransaction = async (req, res) => {
  const { user_id, name, amount, transaction_type, description, category_id } = req.body;
  try {
    const insertQuery = `
      INSERT INTO transactions (user_id, name, amount, transaction_type, description, category_id)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *`;

    const result = await pool.query(insertQuery, [user_id, name, amount, transaction_type, description, category_id]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteTransaction = async (req, res) => {
  const { id } = req.params;
  try {
    const queryText = `DELETE FROM transactions WHERE id = $1`;
    await pool.query(queryText, [id]);
    res.send("OK");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateTransaction = async (req, res) => {
  const { id } = req.params;
  const { user_id, name, amount, transaction_type, description, category_id } = req.body;
  try {
    const queryText = `
      UPDATE transactions
      SET user_id = $1, name = $2, amount = $3, transaction_type = $4, description = $5, category_id = $6
      WHERE id = $7
      RETURNING *`;

    const result = await pool.query(queryText, [user_id, name, amount, transaction_type, description, category_id, id]);
    res.send(result.rows[0]).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export { getTransactions, getOneTransaction, createTransaction, deleteTransaction, updateTransaction };
