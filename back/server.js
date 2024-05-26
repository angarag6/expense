import express from "express";
import dotenv from "dotenv";
import bp from "body-parser";
import cors from "cors";
import { pool } from "./db.js";
import {user} from "../back/src/router/user.js"
import { transaction } from "../back/src/router/transaction.js";
import { categories } from "../back/src/router/category.js";
dotenv.config();
const PORT = process.env.PORT || 8003;
const app = express();
app.use(bp.json());
app.use(cors());
app.use("/transactions", transaction);
app.use("/users", user);
app.use('/categories',categories)
app.listen(PORT, (req, res) => {
  console.log(`ON, ${PORT}`);
});
const enableUuidOsspExtensionQuery =
  'CREATE EXTENSION IF NOT EXISTS "uuid-ossp"';
pool.query(enableUuidOsspExtensionQuery, (err, result) => {
  if (err) {
    console.error("Error enabling uuid-ossp extension:", err);
  } else {
    console.log("uuid-ossp extension enabled");
  }
});
app.post("/createTable", async (_, res) => {
  try {
    const tableQueryText = `
      CREATE TABLE IF NOT EXISTS users (
        id uuid PRIMARY KEY DEFAULT uuid_generate_v4() ,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE,
        password VARCHAR(255) NOT NULL,
        avatarimg BYTEA,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        currency_type VARCHAR(50)
      )`;
    await pool.query(tableQueryText);
    res.send("Table created successfully");
  } catch (error) {
    console.error(error);
    res.send("Error creating table");
  }
});
app.post("/createCategoryTable", async (_, res) => {
  try {
    const categoryTableQueryText = `
      CREATE TABLE IF NOT EXISTS category (
        id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        user_id uuid REFERENCES users(id),
        name VARCHAR(255) NOT NULL,
        description TEXT,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        category_img TEXT
      )`;
    await pool.query(categoryTableQueryText);
    res.send("Category table created successfully");
  } catch (error) {
    console.error(error);
    res.send("Error creating category table");
  }
});
app.post("/createTransactionTable", async (_, res) => {
  try {
    const transactionTableQueryText = `
    CREATE TABLE IF NOT EXISTS transactions (
      id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
      user_id uuid REFERENCES users(id),
      name TEXT,
      amount REAL NOT NULL,
      transaction_type VARCHAR(3) CHECK (transaction_type IN ('INC', 'EXP')),
      description TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      category_id uuid REFERENCES category(id)
  );`;
    await pool.query(transactionTableQueryText);
    res.send("Transaction table created successfully");
  } catch (error) {
    console.error(error);
    res.send("Error creating transaction table");
  }
});
app.post("/deleteTable", async (_, res) => {
  try {
    const deleteTableQuery = "DROP TABLE IF EXISTS category";
    await pool.query(deleteTableQuery);
    res.send("Table deleted successfully");
  } catch (error) {
    console.error(error);
    res.send("Error deleting table");
  }
});
