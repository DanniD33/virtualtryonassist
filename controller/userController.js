import express from "express";
import tensorflow from "@tensorflow/tfjs-node";
import loadModel from "../tensorModel/model.js";
const getUser = ('/', (req, res) => {
let epochData = [];
//we want to push each single iteration into an array
  epochData.push(loadModel)
};

export default getUser;