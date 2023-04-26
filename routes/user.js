
//                          [-------------]
//Server/endpoints.js ====> Routes/user.js ====> server/Controller/userController.js
//                          [-------------]


import express from "express";
import getusermedia from "getusermedia";
import userController from "../server/controller/userController.js";
// import loadUserVideo from "../image/webcam/webcam.js";
//All routes in this file starts with /users
//localhost:3000/users
const router = express.Router();
//get user
// const successfullyGotUsers = router.get('/', getUser);
const successfullyGotUsers = router.get('/', userController.getCamera);

// const generateSpecs = router.post('/mySpecs', mySize);
// const userVideo = router.get('/userVideo', loadUserVideo);
//create new user
// const newUser = router.post(('/post', create));

//update user
// const updateUser = router.put(('/update/:id', edit));

// //delete user
// const deleteUser = router.delete(('/id', remove));

export default successfullyGotUsers;