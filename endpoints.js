// console.log("Danni your server is running")

import express from "express";
// const { response } = require("express");
import bodyParser from 'body-parser';
import successfullyGotUsers from "./routes/user.js"; 
import path from 'path';

// const { request } = require("http");
const app = express();
const port = 3000;

//setup middleware
app.use(bodyParser.json());

//send a request to get the information submitted from form aka the two input images
app.get('/', (req, res) => {
  res.send('Main homepage');
});

app.use('/users', successfullyGotUsers);

app.listen(port, () => {
  console.log(`Actively listening on port ${port}`);
});

// import express from "express";
// import getusermedia from "getusermedia";
// import getUser from "../controller/userController.js";
// import loadUserVideo from "../image/webcam/webcam.js";

// const app = express();
// //create an endpoint that gets all users
// //create an endpoint that adds a user and a serial id
// //create an endpoint that gets data of a specific userId aka their profile
// //create an endpoint that when given an endpoint and a userID, allows edits
// //create an endpoint that removes a user completely 



// // app.get()
// //All routes in this file starts with /users
// //localhost:3000/users
// // const router = express.Router();
// const successfullyGotUsers = router.get('/', getUser);
// // const generateSpecs = router.post('/mySpecs', mySize);
// // const userVideo = router.get('/userVideo', loadUserVideo);
// export default successfullyGotUsers;