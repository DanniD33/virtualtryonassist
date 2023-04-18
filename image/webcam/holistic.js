/**
 * 
 * 
 * (To make sure your browser isn't caching a stale version, you can open the JS Console, check the "Disable cache" box under the "Network" tab, and then leave the JS Console open while loading the page).
 * 
 * 
 *
 */


const videoElement = document.getElementById('video');
const canvasElement = document.getElementById('canvas');
const canvasCtx = canvasElement.getContext('2d');

function onResults(results) {
  canvasCtx.save();
  canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
  canvasCtx.drawImage(results.segmentationMask, 0, 0,
                      canvasElement.width, canvasElement.height);

  // Only overwrite existing pixels.
  canvasCtx.globalCompositeOperation = 'source-in';
  canvasCtx.fillStyle = '#00FF00';
  canvasCtx.fillRect(0, 0, canvasElement.width, canvasElement.height);

  // Only overwrite missing pixels.
  canvasCtx.globalCompositeOperation = 'destination-atop';
  canvasCtx.drawImage(
      results.image, 0, 0, canvasElement.width, canvasElement.height);

  canvasCtx.globalCompositeOperation = 'source-over';
  drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS,
                 {color: '#00FF00', lineWidth: 4});
  drawLandmarks(canvasCtx, results.poseLandmarks,
                {color: '#FF0000', lineWidth: 2});
  drawConnectors(canvasCtx, results.faceLandmarks, FACEMESH_TESSELATION,
                 {color: '#C0C0C070', lineWidth: 1});
  drawConnectors(canvasCtx, results.leftHandLandmarks, HAND_CONNECTIONS,
                 {color: '#CC0000', lineWidth: 5});
  drawLandmarks(canvasCtx, results.leftHandLandmarks,
                {color: '#00FF00', lineWidth: 2});
  drawConnectors(canvasCtx, results.rightHandLandmarks, HAND_CONNECTIONS,
                 {color: '#00CC00', lineWidth: 5});
  drawLandmarks(canvasCtx, results.rightHandLandmarks,
                {color: '#FF0000', lineWidth: 2});
  canvasCtx.restore();
}

const holistic = new Holistic({locateFile: (file) => {
  return `https://cdn.jsdelivr.net/npm/@mediapipe/holistic/${file}`;
}});
holistic.setOptions({
  staticImageMode: false,
  modelComplexity: 1,
  smoothLandmarks: true,
  enableSegmentation: true,
  smoothSegmentation: true,
  refineFaceLandmarks: true,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5
});

holistic.onResults(onResults);

// videoElement.onFrame = async (videoElement) => {
//     await holistic.send({
//       canvasElement: videoElement
//     });
//   }
// onFrame.start();

// async function camera(){
//get usermedia and pass in the stream
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
    videoElement.srcObject = stream;
    videoElement.addEventListener('loadeddata', predictWebcam);
    event.target.classList.add('removed'); 
});
}


videoElement.width = videoElement.videoWidth;
videoElement.height = videoElement.videoHeight;

const camera = new Camera(videoElement, {
    onFrame: async () => {
      await holistic.send({canvasElement: videoElement});
    },
    width: 1280,
    height: 720
  });
// } 
camera.start();