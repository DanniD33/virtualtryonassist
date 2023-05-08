const button = document.getElementById('webcamButton');
const video = document.getElementById('webcam');
const canvas = document.getElementById('canvas');
const model = poseDetection.SupportedModels.BlazePose;


/*
 ____________________________________________________________________________
                          Get Webcam PERMISSION
 ____________________________________________________________________________
 */

function getUserMediaSupported() {
  return !!(navigator.mediaDevices &&
    navigator.mediaDevices.getUserMedia);
}
      if (getUserMediaSupported()) {
  button.addEventListener('click', enableCam);
} else {
  console.log('getUserMedia() is not supported by your browser');
}




/*
 ____________________________________________________________________________
                          ENABLE Webcam
 ____________________________________________________________________________
 */



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





/*
 ____________________________________________________________________________
                          Draw Webcam to Canvas
 ____________________________________________________________________________
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
                        Create Detector
 ____________________________________________________________________________
 */



const detectorConfig = {
  runtime: 'tfjs',
  solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/pose',
  enableSmoothing: true,
  modelType: 'full'
};
const detector = async function detector(){
await poseDetection.createDetector(model, detectorConfig);
}

/*
 ____________________________________________________________________________
          Use Previously Created Detector to Detect Poses
 ____________________________________________________________________________
 */

const estimationConfig = {flipHorizontal: true};
const timestamp = performance.now();
const poses = async function poses(canvas){
  await detector.estimatePoses(canvas, estimationConfig, timestamp);
  // console.log(poses.score);
} 
console.log(poses());

// poses()


/*
 ____________________________________________________________________________
                            Create a Camera Class
 ____________________________________________________________________________
 */



const ANCHOR_POINTS = [[0, 0, 0], [0, 1, 0], [-1, 0, 0], [-1, -1, 0]];
export class Camera {
  constructor() {
    this.video = document.getElementById('video');
    this.canvas = document.getElementById('output');
    this.ctx = this.canvas.getContext('2d');
    this.scatterGLEl = document.querySelector('#scatter-gl-container');
    this.scatterGL = new scatter.ScatterGL(this.scatterGLEl, {
      'rotateOnStart': true,
      'selectEnabled': false,
      'styles': {polyline: {defaultOpacity: 1, deselectedOpacity: 1}}
    });
    this.scatterGLHasInitialized = false;
  }