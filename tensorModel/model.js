import express from 'express';
import * as tf from '@tensorflow/tfjs-node';
//we will 

//we will need to import webcam.js outp and turnit into a model in this folder
//create model; we are going to derve this back

//tf.model = graphs a group of layers as they dont have cycles
//tf.sequential = linear stack of layers
// const sayHi = () => {
//   return 'saying wassup bro';
// };

//Load simple model
const loadModel = () => {
  //created a 2-D model 11:52 2022-11-16
  const model = tf.sequential();
  model.add(tf.layers.dense({units: 1, activation: 'relu', inputShape: [1]}));

  // model.add(tf.layers.dense({units: 1, activation: 'linear'}));
  model.compile({optimizer: 'sgd', loss: 'meanSquaredError'});
  
  // const xs = tf.randomNormal([100,10]);
  // const ys = tf.randomNormal([100,1]);
  
  
  const xs = tf.tensor2d([1, 2, 3, 4], [4, 1]);
  const ys = tf.tensor2d([1, 3, 5, 7], [4, 1]);

  //trains the model for desired number of epochs and at the end returns a function
  
    model.fit(xs, ys, {
      epochs: 100,
      // callbacks: {
      //   onEpochEnd: (epch, log) => console.log(`Epoch ${epoch}: loss = ${log.loss}`)
      // }
    }).then(() => {
      model.predict(tf.tensor2d([5], [1,1])).print();
    });
}; 
// loadModel();


//create a function that captures webcam and outputs a tensor

// sayHi();
// export default sayHi;

export default loadModel;