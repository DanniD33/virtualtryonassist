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























































  // function draw() {
//   var ctx = document.getElementById('canvas').getContext('2d');
//   var img = new Image();
//   img.onload = function() {
//     ctx.drawImage(img, 0, 0);
//   };
//   img.src = '/files/4531/backdrop.png';
// }


// console.log(torsoPoints);
// canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
  
    
    // //x,y,width,height
    // let width = Math.abs(lshoulder.x - lshoulder.y)
    // let height =  Math.abs(lshoulder.y - Math.min(lhip.y, rhip.y))






























    // canvasCtx.strokeStyle = 'purple';
    // canvasCtx.strokeWidth = 3;
    // canvasCtx.strokeRect(torsoRect.x, torsoRect.y, torsoRect.width, torsoRect.height);
  
    // console.log(lshoulder.x * canvasElement.width, lshoulder.y *canvasElement.height)
    
    // let frx = 0
    // let fry = 0



    // let frx = lshoulder.x * canvasElement.width
    // let fry = lshoulder.y * canvasElement.height
    // console.log(frx, fry);
    
    // let fx = lshoulder.x; 
    // let fy = lshoulder.y;
    
    // let scale = Math.min(canvasElement.width / filter.width, canvasElement.height / filter.height);

    // canvasCtx.clearRect(0,0,canvasElement.width, canvasElement.height);

























    // let nw = filter.width * scale;
    // let nh = filter.height * scale;
    
    
    // let px = (lshoulder.x * (canvasElement.width / 2) - (nw / 2));
    // let py = (lshoulder.y * (canvasElement.height / 2) - (nh / 2));

    // let fw = Math.min(filter.width, canvasElement.width);
    // let fh = Math.min(filter.height, canvasElement.height);
    
    // //get middle of shoulders aka the spine


    // let spinex = (lshoulder.x + rshoulder.x) / 2
    // let spiney = (lshoulder.y + rshoulder.y) / 2
    
    // //get middle of image and draw it
    // let filterx = filter.width / 2
    
    // let px = ((lshoulder.x * filter.width) - filter.width) * 2
    // let py = ((lshoulder.y * filter.height) - filter.height) * 2  
  

//     const filter = new Image();
// filter.src = 'items/shirts/teamshirt.png'

    // let px = ((spinex * filter.width) - filter.width) / 2
    // let py = ((spiney * filter.height) - filter.height) / 2 
      



    // let scale_factor = Math.min(canvas.width / img.width, canvas.height / img.height);



























     // let px = filter.naturalWidth / 4
    // let py = filter.naturalHeight / 4 

      // console.log(filter.width, filter.height)
      // console.log('logging coordinates', px, py)
      // const scale = filter.height/filter.width;
      


      //draw rectangle around shoulders
      // canvasCtx.strokeRect(200,200, 100,100)
      // canvasCtx.strokeStyle = 'purple';
      // canvasCtx.strokeRect(Math.abs(lshoulder.x), Math.abs(lshoulder.y), Math.abs(rshoulder.x - lshoulder.x), Math.abs(rshoulder.y - lshoulder.y));

      // let torsoH = (rshoulder.x - lshoulder.x) * (filter.height/filter.width)
        // canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
      // b6.onclick = () => {

        //   canvasCtx.save()
      // filter.onload = function() {

        // b6.onclick = function() {
        // const loadFilter = () => {

        // canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);

        // // canvasCtx.drawImage(filter, px, py, rshoulder.x - lshoulder.x, torsoH);  
        
        // // canvasCtx.drawImage(filter, 0, 0, 1000, 1000);  
        // // canvasCtx.drawImage(filter, px, py);  
        
        //   console.log('image loaded', px , py, filter.width, filter.height)
        // }

































        // }

        // filter.onload = loadFilter();

        // filter.style = "width: 100%"
        // console.log('image loaded', px , py, filter.width, filter.height)
      // }
      // };
    // filter.src = 'items/shirts/teamshirt.png'
      
      // filter.src = 'items/shirts/teamshirt.png'

      // canvasCtx.drawImage(filter, px, py);
      // filter.scale(.5, .5)

      // canvasCtx.drawImage(filter, px, py);

































       // b6.onclick = loop();

  // canvasCtx.drawImage(maskImg, x, y, width, height);
  // console.log(results.poseLandmarks[23])
// };
//an array of arrays, each sub array is an x and y coordinate of position
    // let torso = []
    // // 11 -> 12 , 11 -> 13, 12 -> 14, 12 -> 24, 11 -> 23, 23 -> 24
    // let torsoPoints = [
    //   POSE_CONNECTIONS[9],
    //   POSE_CONNECTIONS[10],
    //   POSE_CONNECTIONS[16],
    //   POSE_CONNECTIONS[23],
    //   POSE_CONNECTIONS[22],
    //   POSE_CONNECTIONS[24]
    // ];

    // let torsoPoints = [
    //  rshoulder =  results.poseLandmarks[10],
    //  rbicep = results.poseLandmarks[12],
    //  lshoulder = results.poseLandmarks[11],
    //  lbicep = results.poseLandmarks[13],
    //  lhip = results.poseLandmarks[22],
    //  rhip = results.poseLandmarks[23]
    // ];


  // console.log(results.poseLandmarks[10].y)
    // const options = {
    //   upperBodyOnly: true,
    // }



    // drawConnectors(canvasCtx,results.poseLandmarks, torsoPoints, {color: 'purple', lineWidth: 20});
    // drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS, {color: 'purple', lineWidth: 20})
    // canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);




























    