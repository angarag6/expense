import express from "express"
import 
{getCategories, getOneCategory, createCategory, deleteCategory, updateCategory }
from "../controller/category.js"
const categories = express.Router()
categories.route("/").get(getCategories).post(createCategory)
categories.route("/category").get(getOneCategory).delete(deleteCategory).put(updateCategory)
export {categories}