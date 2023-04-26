/*
 Getting a CORS error when linked to html doc so written in ; 
 
 # auxiliary key points.
# 0 - nose
# 1 - left eye (inner)
# 2 - left eye
# 3 - left eye (outer)
# 4 - right eye (inner)
# 5 - right eye
# 6 - right eye (outer)
# 7 - left ear
# 8 - right ear
# 9 - mouth (left)
# 10 - mouth (right)
# 11 - left shoulder
# 12 - right shoulder
# 13 - left elbow
# 14 - right elbow
# 15 - left wrist
# 16 - right wrist
# 17 - left pinky
# 18 - right pinky
# 19 - left index
# 20 - right index
# 21 - left thumb
# 22 - right thumb
# 23 - left hip
# 24 - right hip
# 25 - left knee
# 26 - right knee
# 27 - left ankle
# 28 - right ankle
# 29 - left heel
# 30 - right heel
# 31 - left foot index
# 32 - right foot index
 
 */









const videoElement = document.getElementsByClassName('input_video')[0];
  const canvasElement = document.getElementsByClassName('output_canvas')[0];
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
    modelComplexity: 1,
    smoothLandmarks: true,
    enableSegmentation: true,
    smoothSegmentation: true,
    refineFaceLandmarks: true,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5
  });
  holistic.onResults(onResults);
  
  const camera = new Camera(videoElement, {
    onFrame: async () => {
      await holistic.send({image: videoElement});
    },
    width: 640,
    height: 480
  });
  camera.start();