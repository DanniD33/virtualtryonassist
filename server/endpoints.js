// console.log("Danni your server is running")

import express from "express";
// const { response } = require("express");
import bodyParser from 'body-parser';
import successfullyGotUsers from "../routes/user.js"; 
import path from 'path';

// const { request } = require("http");
const app = express();
const port = 3000;

//setup middleware
app.use(bodyParser.json());

//send a request to get the information submitted from form aka the two input images
app.use('/users', successfullyGotUsers);
app.get('/', (req, res) => {
res.send('homepage')
});
app.listen(port, () => {
  console.log(`Actively listening on port ${port}`);
});