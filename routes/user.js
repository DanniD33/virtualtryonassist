import express from "express";
import getUser from "../controller/userController.js";
//All routes in this file starts with /users
//localhost:3000/users
const router = express.Router();
const successfullyGotUsers = router.get('/', getUser);
// const generateSpecs = router.post('/mySpecs', mySize);

export default successfullyGotUsers;