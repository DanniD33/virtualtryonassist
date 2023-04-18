
//import

//create a webdoc that gets els and exports them as pixels
//look at tf.browser.fromPixels in the tfjs documentation

// const getDomEl = () => {

// }
// import * as tf from '@tensorflow/tfjs';
// import sayHi from './test5.js';

// let splitHi = sayHi.split(' ');
// // console.log(splitHi);
// tf.print(splitHi);
// for (let i = 0; i < )
// const loadUp = () => {

//   const MODEL_PATH = 'https://tfhub.dev/google/tfjs-model/movenet/singlepose/lightning/4';
//   let movenet = undefined;
  
//   async function loadAndRunModel(){
//     movenet = await tf.loadGraphModel(MODEL_PATH, {fromTFHub: true});
//     let exampleInputTensor = tf.zeros([1,192,192,3], 'int32');
//     let tensorOutput = movenet.predict(exampleInputTensor);
//     let arrayOutput = await tensorOutput.array();
    
//     console.log(arrayOutput[0]);
    
    
//   }
//   loadAndRunModel();
// };
// export default loadUp;