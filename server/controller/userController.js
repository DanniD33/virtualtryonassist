
//                                              [-------------]
//Server/endpoints.js ====> Routes/user.js ====> Controller/userController.js
//                                              [-------------]

//WE will export a controller object with all of our crud methods that will be used to query database


import express from "express";
// import userDB from "../databases/userModel.js";
let app = express();
import tf from "@tensorflow/tfjs-node";
import loadModel from "../../tensorModel/model.js";
import { fileURLToPath } from "url";
// import webcam from '../image/webcam/webcam.js';
import bodyParser from 'body-parser';
app.use(bodyParser.json());
import path from "path";
// import captureVideo from "../tensorModel/model.js";
// import loadingCam from "../image/webcam/webcamserver.js";
// import queryDB from "../databases/userModel.js";

//this fucntion is exported to routes/user.js and is used as a middleware function. We need to create this middleware function that reads/write to a database
// const user = {
//   "FirstName": "Danni",
//   "Email": "d123@gmail.com",
//   "Birthday": "April 2",
//   "Cam" : "idle"
// };
const userController = {
  //get tryon cam
  getCamera(req,res, next){
          const __dirname = path.resolve();
          res.sendFile(path.join(__dirname + '/image/webcam/videoCap.html'));
          
        }
  //add user
  //remove user
  //update info
  //remove user
  //get camera
};
          export default userController;