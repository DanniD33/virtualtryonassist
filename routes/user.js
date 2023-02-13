import express from "express";
import getusermedia from "getusermedia";
import getUser from "../controller/userController.js";
import loadUserVideo from "../image/webcam/webcam.js";
//All routes in this file starts with /users
//localhost:3000/users
const router = express.Router();
const successfullyGotUsers = router.get('/', getUser);
// const generateSpecs = router.post('/mySpecs', mySize);
// const userVideo = router.get('/userVideo', loadUserVideo);
export default successfullyGotUsers;