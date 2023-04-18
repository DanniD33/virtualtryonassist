// Load the dependencies
import * as poseDetection from '@tensorflow-models/pose-detection';
import * as tf from '@tensorflow/tfjs-core';
import * as tfWebgl from '@tensorflow/tfjs-backend-webgl';
import * as tfConverter from '@tensorflow-models/tfjs-converter';
// import * as blazepose from '@tensorflow-models/blazepose';


const model = poseDetection.SupportedModels.BlazePose;
const detectorConfig = {
  runtime: 'tfjs',
  enableSmoothing: true,
  modelType: 'full'
};
async function detector(){
  await poseDetection.createDetector(model, detectorConfig);
};

const estimationConfig = {flipHorizontal: true};
const timestamp = performance.now();
async function poses(){
  await detector.estimatePoses(image, estimationConfig, timestamp);
};

model.fit(xs, ys, {
  epochs: 100,
  callbacks: {
    onEpochEnd: (epch, log) => console.log(`Epoch ${epoch}: loss = ${log.loss}`)
  }
});

