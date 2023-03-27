const video = document.getElementById('webcam');
const liveView = document.getElementById('liveView');
const demosSection = document.getElementById('demos');
const enableWebcamButton = document.getElementById('webcamButton');

//LSTM layer: Best way to describe it is like  a  mini  recording of a neural network; We are able to look back  at prior detections of hand (flattened array of frames(x,)) to  make a prediction  



//First Check to see if we are able to get webcam using getUserMedia 
function getUserMediaSupported() {
  return !!(navigator.mediaDevices &&
    navigator.mediaDevices.getUserMedia);
}
  //If we CAN get access to camera, create an event listener for our Try Me On button that once clicked, starts to run our function
if (getUserMediaSupported()) {
  enableWebcamButton.addEventListener('click', enableCam);
  //If we CANNOT get access to camera, send back a message saying not supported 
} else {
  console.warn('getUserMedia() is not supported by your browser');
}

//Once we hear the event, our function will load tensor api , we will began the stream of our webcam then need to break our stream into frames that we can then pass into our predictWebcam   

let model;
let children = [];

function enableCam(event) {

  cocoSsd.load().then(function (loadedModel){
    model = loadedModel;
    demosSection.classList.remove('invisible');
  });
  
  event.target.classList.add('removed'); 
  
  const constraints = {
    video: true
  };
  
  navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
    video.srcObject = stream;
    video.addEventListener('loadeddata', predictWebcam);
  });
  
  demosSection.classList.remove('invisible');


  //create predict Webcam, which when model detects that a video exists, will then run a function that create an array of frames, takes in that entire array, and grabs each frames from our webcam and passes it to the model to be classified
    //What does classify mean? --> 
      //the current frame is passed through a prediction function that returns whether the current frame's score (.score is a property on a model in tensor) is oover 66%

    function predictWebcam() {
      // Now let's start classifying a frame in the stream.
      model.detect(video).then(function (predictions) {
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