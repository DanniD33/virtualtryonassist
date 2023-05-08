
const video = document.getElementById('webcam');
const canvas = document.getElementById('canvas');
const liveView = document.getElementById('liveView');
const demosSection = document.getElementById('demos');
const enableWebcamButton = document.getElementById('webcamButton');
let ctx = canvas.getContext('2d');
let poses; 

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

function getUserMediaSupported() {
    return !!(navigator.mediaDevices &&
      navigator.mediaDevices.getUserMedia);
} 
if (getUserMediaSupported()) {
    enableWebcamButton.addEventListener('click', enableCam);
} else {
  console.warn('getUserMedia() is not supported by your browser');
}
  
// Enable the live webcam view and start classification.
async function enableCam(event) {
  if (!model) {
    console.log('model not found');
    return;
  }
  // getUsermedia parameters to force video but not audio.
  const constraints = {
    video: true
  };
  // document.getElementById('canvas').style.zIndex = "6";
  // Activate the webcam stream.
  await navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
    video.srcObject = stream;
    video.addEventListener('loadeddata', predictWebcam);
    // Hide the button once clicked.
    event.target.classList.add('removed');  
  });
}

async function predictWebcam() {
  
  const videoHeight = video.videoHeight;
  const videoWidth = video.videoWidth;
  
  video.width = videoWidth;
  video.height = videoHeight;
  canvas.width = videoWidth;
  canvas.height = videoHeight;
  
  // Store the resulting model in the global scope of our app.
  let model = undefined;
  let detector = undefined; 
  // Before we can use BlazePose class we must wait for it to finish
  async function loadModel(){
    model = poseDetection.SupportedModels.BlazePose;
    const detectorConfig = {
      runtime: 'tfjs',
      enableSmoothing: true,
      modelType: 'full'
    };
    detector = await poseDetection.createDetector(model, detectorConfig);
    demosSection.classList.remove('invisible');
  }
  poses = await detector.estimatePoses(canvas);   
  // ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
  
  if(poses && poses.length > 0){
    for(const pose of poses){
      if(pose.keypoints != null){
        drawKeypoints(pose.keypoints);
      }
    }
  }
  window.requestAnimationFrame(predictWebcam);
}

function drawKeypoints(keypoints){
  
  for(let i = 0; i < keypoints.length; i++){
    drawKeypoint(keypoints[i]);
  }
  
}

function drawKeypoint(keypoint){
  ctx.fillStyle = 'Orange';
  ctx.strokeStyle = 'Green';
  ctx.lineWidth = 2;
  const radius = 4; 
  const circle = new Path2D();
  circle.arc(keypoint.x, keypoint.y, radius, 0, 2 * Math.PI)
  ctx.fill(circle)
  ctx.stroke(circle)
}
