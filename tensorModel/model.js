import express from 'express';
import tf from '@tensorflow/tfjs-node';


//we will need to import webcam.js outp and turnit into a model in this folder
//create model; we are going to derve this back

//tf.model = graphs a group of layers as they dont have cycles
//tf.sequential = linear stack of layers


//Load simple model
const loadModel = () => {
  //created a 2-D model 11:52 2022-11-16
  const model = tf.sequential();
  model.add(tf.layers.dense({units: 100, activation: 'relu', inputShape: [10]}));
  model.add(tf.layers.dense({units: 1, activation: 'linear'}));
  model.compile({optimizer: 'sgd', loss: 'meanSquaredError'});
  
  const xs = tf.randomNormal([100,10]);
  const ys = tf.randomNormal([100,1]);
  
  
  //trains the model for desired number of epochs and at the end returns a function
  
  model.fit(xs, ys, {
    epochs: 100,
    callbacks: {
      onEpchEnd: (epch, log) => console.log(`Epoch ${epoch}: loss = ${log.loss}`)
    }
  });
};


//create a function that captures webcam and outputs a tensor



export default loadModel;