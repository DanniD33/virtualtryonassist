// const { platform } = require("os");
const video = document.getElementById('webcam');
const canvas = document.querySelector('canvas');
const liveView = document.getElementById('liveView');
const demosSection = document.getElementById('demos');
const enableWebcamButton = document.getElementById('webcamButton');
const ctx = canvas.getContext('2d');

//LSTM layer: Best way to describe it is like  a  mini  recording of a neural network; We are able to look back  at prior detections of hand (flattened array of frames(x,)) to  make a prediction  

// async function platform(){
//   await tf.setBackend('cpu');
// };

/*
 ____________________________________________________________________________
                          Add Style
 ____________________________________________________________________________
 */


// Get HTML head element
var head = document.getElementsByTagName('HEAD')[0];
 
// Create new link Element
var link = document.createElement('link');

// set the attributes for link element
link.rel = 'stylesheet';

link.type = 'text/css';

link.href = 'style.css';

// Append link element to HTML head
head.appendChild(link);

/*
 ____________________________________________________________________________
                          Getting User Webcam
 ____________________________________________________________________________
 
1.) First Check to see if we are able to get webcam using getUserMedia 

2.)If we CAN get access to camera, create an event listener for our Try Me On button 
that once clicked, starts to run our function

3.)If we CANNOT get access to camera, send back a message saying not supported 
*/



function getUserMediaSupported() {
  return !!(navigator.mediaDevices &&
    navigator.mediaDevices.getUserMedia);
}
      if (getUserMediaSupported()) {
  enableWebcamButton.addEventListener('click', enableCam);
} else {
  console.log('getUserMedia() is not supported by your browser');
}




/*
____________________________________________________________________________
                        Drawing Webcam to Canvas
____________________________________________________________________________

1.) In this code block (25), we,'ll draw the  stream from   our webcam to the canvas

*/



const width = 640;
const height = 480;
let canvasInterval = null;
const drawImage = (video) => {
  canvas.getContext('2d', { alpha: false }).drawImage(video, 0, 0, width, height);
};
canvasInterval = window.setInterval(() => {
  drawImage(video);
}, 1000);
video.onpause = function() {
  clearInterval(canvasInterval);
};
video.onended = function() {
  clearInterval(canvasInterval);
};
video.onplay = function() {
  clearInterval(canvasInterval);
  canvasInterval = window.setInterval(() => {
    drawImage(video);
  }, 1000 );
};



/*
 ____________________________________________________________________________
                          Load Model and Create Detector
 ____________________________________________________________________________
 
 1.) Once we hear the event, our function will load tensor api , we will began the stream of our webcam then need to break our stream into frames that we can then pass into our predictWebcam   
 
 */
 
let children = [];
let model = poseDetection.SupportedModels.BlazePose;
async function initPoses(){

  //create a function that Loads Model (cannot use await outside of async)
  // async function model(){
  //   await tf.loadLayersModel('https://cdn.jsdelivr.net/npm/@tensorflow-models/pose-detection');
  //   // model.summary();
  // }


  const detectorConfig = {
    runtime: 'tfjs',
    enableSmoothing: true,
    modelType: 'full'
  };
  let detector = await poseDetection.createDetector(model, detectorConfig);


  const estimationConfig = {flipHorizontal: true};
  const timestamp = performance.now();
  const poses = await detector.estimatePoses(canvas, estimationConfig, timestamp);

  
  // async function detector(){
  //   await poseDetection.createDetector(model, {runtime:'tfjs', modelType:'lite', solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/pose'});      //.json
  //   // return await detector.json();
  // }
  
}
// async function poses(){
//   const estimationConfig = {enableSmoothing: true};
//   await detector.estimatePoses(canvas, estimationConfig); //we may need to grab canvas of i
//  }
//  console.log(poses());
// return detector;

  // const model = poseDetection.SupportedModels.BlazePose;
  
  //   async function detector(){
    //   await poseDetection.createDetector(model, {runtime:'tfjs', modelType:'lite', solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/pose'});      //.json
    //   // return await detector.json();
    // }
    demosSection.classList.remove('invisible');
    // });
    
    
    /*     ____________________________________________________________________________
    Get Poses
    ____________________________________________________________________________
    
    1.) Our poses function will call an asynchronous frunction that passes the canvas through the detector and estimates thes poses
    
    
    */
   // let model = poseDetection.SupportedModels.BlazePose;
    
    
    // const keypoints = poses.keypoints;
    
    // // Draw the points on the canvas
    // keypoints.forEach((keypoint) => {
      //   const x = keypoint.position.x;
      //   const y = keypoint.position.y;
      //   ctx.beginPath();
      //   ctx.arc(x, y, 5, 0, 2 * Math.PI);
      //   ctx.fillStyle = 'red';
      //   ctx.fill();
      // });
      
      
      
      async function enableCam(event) {
        
        // Load stream from webcam using getUserMedia api
        const constraints = {
          'video': {
            width:'640',
            height:'480'
          }
        };
        // video.videoWidth = 640;
        // video.videoHeight = 480;
        // add canvas style April 3, 2023 8:03pm
        // canvas.style.zIndex = 
        await navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
          video.srcObject = stream;
          video.addEventListener('loadeddata', predictWebcam);
          event.target.classList.add('removed'); 
  });
}


video.width = video.videoWidth;
video.height = video.videoHeight;



  //create predict Webcam, which when model detects that a video exists, will then run a function that create an array of frames, takes in that entire array, and grabs each frames from our webcam and passes it to the model to be classified
    //What does classify mean? --> 
      //the current frame is passed through a prediction function that returns whether the current frame's score (.score is a property on a model in tensor) is oover 66%

    async function predictWebcam(model) {
      
      // Now let's start classifying a frame in the stream.
      async function classify(){

      await model.detect(canvas)
      .then(function (predictions) {
      // model.detect(canvas.captureStream()).then(function (predictions) {
        // Remove any highlighting we did previous frame.
        for (let i = 0; i < children.length; i++) {
        //LiveView is the entire section under the Id = "liveView" which contains our video webcam in and of itself  +  Try Me On button 
        liveView.removeChild(children[i]);
      }
      //remove frame from DOM and from Memory after its classified; We can still reference a copy of the frame but its otherwise deleted as long as we have a parent node (aka liveView), we can draw from 

        children.splice(0); //copy of the rest of the frames that haven't been classified
    
        // Now lets loop through predictions and draw them to the live view if
        // they have a high confidence score.
        for (let n = 0; n < predictions.length; n++) {
          // If our current frame is over 66% sure we are able to detect a classifiable item and that the detection is right, so draw it!
          
            if (predictions[n].score > 0.66) {
                //we'll add a new element to our DOM that displays the a message letting us know what our prediction is and the confidence
            
            const p = document.createElement('p');
            
            p.innerText = predictions[n].class  + ' - with ' 
                + Math.round(parseFloat(predictions[n].score) * 100) 
                + '% confidence.';
            p.style = 'margin-left: ' + predictions[n].bbox[0] + 'px; margin-top: '
                + (predictions[n].bbox[1] - 10) + 'px; width: ' 
                + (predictions[n].bbox[2] - 10) + 'px; top: 0; left: 0;';
              //Here we can highlight the detected area but for some reason the highlight isn't visible
            
            
              const highlighter = document.createElement('div');
            highlighter.setAttribute('class', 'highlighter');
            highlighter.style = 'left: ' + predictions[n].bbox[0] + 'px; top: '
                + predictions[n].bbox[1] + 'px; width: ' 
                + predictions[n].bbox[2] + 'px; height: '
                + predictions[n].bbox[3] + 'px;';
            

            
            liveView.appendChild(highlighter);
            liveView.appendChild(p);
            children.push(highlighter);
            children.push(p);
          }
        }
      
        // Call this function again to keep predicting when the browser is ready.
        window.requestAnimationFrame(predictWebcam);
      });
    }

}



    

//we need objetDetection
//we need posenetAPI
//Layered on top hand pose api