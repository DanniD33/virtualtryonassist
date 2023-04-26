const webcam = document.getElementById('webcam');
const canvas = document.getElementById('canvas');
const outputCtx = canvas.getContext('2d');

// import blazepose from '@tensorflow-models/pose-detection';

/*
 ________________________________________________________________________
                          
 ________________________________________________________________________
 */



async function getModel(){

// const model =  await new blazepose.BlazePose({locateFile: (file) => {
//     return `https://cdn.jsdelivr.net/npm/@mediapipe/blazepose/${file}`;
//   }});
//   await model.initialize();


const model = await posenet.load({
  architecture: 'blazepose',
  inputResolution: { width: 640, height: 480 },
  quantBytes: 2,
});


} 


/*
 ________________________________________________________________________
                          
 ________________________________________________________________________
 */



function hasGetUserMedia() {
  return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
}




function enableCam() {
  if (hasGetUserMedia()) {
    // getUsermedia parameters.
    const constraints = {
      video: true,
      width: 640, 
      height: 480 
    };

    // Activate the webcam stream.
    navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
      webcam.srcObject = stream;
      webcam.addEventListener('loadeddata', function() {
        videoPlaying = true;
        // ENABLE_CAM_BUTTON.classList.add('removed');
      });
    });
  } else {
    console.warn('getUserMedia() is not supported by your browser');
  }
}

enableCam();



/*
 ________________________________________________________________________
                          
 ________________________________________________________________________
 */



async function getPose(){

  const pose = await model.estimateSinglePose(webcam);
  outputCtx.clearRect(0, 0, canvas.width, canvas.height);
  outputCtx.fillStyle = 'red';
  pose.keypoints.forEach((keypoint) => {
    outputCtx.beginPath();
    outputCtx.arc(keypoint.position.x, keypoint.position.y, 5, 0, 2 * Math.PI);
    outputCtx.fill();
  });
} 





/*
 ________________________________________________________________________
                          
 ________________________________________________________________________
 */





export const DEFAULT_BLAZEPOSE_MODEL_CONFIG: BlazePoseTfjsModelConfig = {
  runtime: 'tfjs',
  modelType: 'full',
  enableSmoothing: true,
  enableSegmentation: false,
  smoothSegmentation: true,
  detectorModelUrl: DEFAULT_BLAZEPOSE_DETECTOR_MODEL_URL,
  landmarkModelUrl: DEFAULT_BLAZEPOSE_LANDMARK_MODEL_URL_FULL
};



/*
 ________________________________________________________________________
                          
 ________________________________________________________________________
 */


export const DEFAULT_BLAZEPOSE_ESTIMATION_CONFIG = {
  maxPoses: 1,
  flipHorizontal: false
};




/*
 ________________________________________________________________________
                          
 ________________________________________________________________________
 */




export const DEFAULT_BLAZEPOSE_LANDMARK_MODEL_URL_FULL =
    'https://tfhub.dev/mediapipe/tfjs-model/blazepose_3d/landmark/full/2';


 /*
 ________________________________________________________________________
                          
 ________________________________________________________________________
 */








 /*
 ________________________________________________________________________
                          
 ________________________________________________________________________
 */







 /*
 ________________________________________________________________________
                          
 ________________________________________________________________________
 */





 /*
 ________________________________________________________________________
                          
 ________________________________________________________________________
 */



 /*
 ________________________________________________________________________
                          
 ________________________________________________________________________
 */








 /*
 ________________________________________________________________________
                          
 ________________________________________________________________________
 */







 /*
 ________________________________________________________________________
                          
 ________________________________________________________________________
 */




 /*
 ________________________________________________________________________
                          
 ________________________________________________________________________
 */





 /*
 ________________________________________________________________________
                          
 ________________________________________________________________________
 */