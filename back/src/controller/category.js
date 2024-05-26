import { pool } from "../../db.js";

const getCategories = async (req, res) => {
  const userId = req.query.user_id
  console.log(req.query)

  try {
    const queryText = 'SELECT * FROM category WHERE user_id = $1';
    const response = await pool.query(queryText, [userId]);
    res.json(response.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getOneCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const queryText = `SELECT * FROM category WHERE id = $1`;
    const response = await pool.query(queryText, [id]);
    res.json(response.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createCategory = async (req, res) => {
  const { name, description, category_img, user_id } = req.body;
  try {
    const insertQuery = `
      INSERT INTO category (name, description, category_img , user_id)
      VALUES ($1, $2, $3, $4)
      RETURNING *`;

    const result = await pool.query(insertQuery, [
      name,
      description,
      category_img,
      user_id
    ]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const queryText = `DELETE FROM category WHERE id = $1`;
    await pool.query(queryText, [id]);
    res.send("OK");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, description, category_img } = req.body;
  try {
    const queryText = `
      UPDATE category
      SET name = $1, description = $2, category_img = $3
      WHERE id = $4
      RETURNING *`;

    const result = await pool.query(queryText, [
      name,
      description,
      category_img,
      id,
    ]);
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export {
  getCategories,
  getOneCategory,
  createCategory,
  deleteCategory,
  updateCategory,
};
