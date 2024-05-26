import express from "express";
import {
    createUser,
    deleteUser,
    getOneUser,
    getUsers,
    loginUser,
    updateUser,
} from "../controller/user.js"
const user = express.Router()
user.route('/').get(getUsers).post(createUser);
user.route('/user').get(getOneUser).delete(deleteUser).put(updateUser)
user.route('/auth').post(loginUser)
export { user }