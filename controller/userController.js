import express from "express";
// let app = express();
import tf from "@tensorflow/tfjs-node";
import loadModel from "../tensorModel/model.js";
import path from "path";
// import captureVideo from "../tensorModel/model.js";


const getUser = ('/', (req, res) => {



res.send(loadModel()); 


// let epochData = [];
//we want to push each single iteration into an array
  // epochData.push(loadModel);
  // res.send(loadModel());
  // res.send(path.dirname('../tensorModel/model.js/loadModel'));
  // console.log('hello from controller');

});

export default getUser;