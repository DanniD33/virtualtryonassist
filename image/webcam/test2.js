const videoElement = document.getElementsByClassName('input_video')[0];

if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      throw new Error('Browser API navigator.mediaDevices.getUserMedia not available');
    }
    const videoConfig = {
      'audio': false,
      'video': {
        facingMode: 'user',
        width: 320,
        height: 240,
        frameRate: {
          ideal: 60,
        }
      }
    };

    const stream = await navigator.mediaDevices.getUserMedia(videoConfig);

    videoElement.srcObject = stream;

    await new Promise((resolve) => {
      videoElement.onloadedmetadata = () => {
        resolve(videoElement);
      };
    });

    videoElement.play();
    resizeCanvasToDisplaySize(canvasElement)

    const videoWidth = videoElement.videoWidth;
    const videoHeight = videoElement.videoHeight;
    // Must set below two lines, otherwise video element doesn't show.
    videoElement.width = videoWidth;
    videoElement.height = videoHeight;
    

async function updateVideo(){
  const poses = await detector.estimatePoses(videoElement,    estimationConfig, timestamp);
  await updateScreen(poses)
  //console.log(poses)
  window.requestAnimationFrame(updateVideo);
}

videoElement.onloadeddata = async function() {
        updateVideo()
}