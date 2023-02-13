// //require getusermedia
//   //look into options and adjust as necessary
//   // const express = require('express');

// import { type } from "os";

// import getusermedia from 'getusermedia';
// import express from 'express';


// //access getusmethod and its options
// function loadUserVideo(){

// navigator.mediaDevices.getusermedia({
//     video:true,
//     audio:false
//   },
//   function(err, stream){
//     if (err) console.log(err);
//     document.querySelector('webcamButton').addEventListener('click', async (e) => {
//       const stream = await navigator.mediaDevices.getUserMedia({
//         video: true
//       })
//     })
//     //display video in the broswer 
//       //create an element
//         //push video element into the body
//     const video = document.createElement('video');
//     document.body.appendChild(video);
    
//     video.srcObject = stream;
//     video.play();
//   }
//   );
// }

// export default loadUserVideo;

//   // export default getusermedia;




// const loadWebcam = () => {
//   navigator.mediaDevices.getUserMedia(
//     {
//       video: true, 
//       audio: false
//     }
//   ).then(
//     //create video element
//     let vid = Document.createElementId("vid") 
        //trigger play or on
//   )
// }







// const webcam = () => {



// if (typeof document !== "undefined"){
 
//   const video = document.getElementById('webcam');
//   const liveView = document.getElementById('liveView');
//   const demosSection = document.getElementById('demos');
//   const enableWebcamButton = document.getElementById('webcamButton');
//   const errorMsgElement = document.querySelector('span#errorMsg');
//   // vendorURL = window.URL || window.webkitURL;

// const constraints = {
//   video: {
//     width: 1280, height: 720
//   },
//   audio: false

// }

// async function init(){
//   try{
//     const stream = await navigator.mediaDevices.getUserMedia(constraints);
//     handleSuccess(stream);
//   } catch (err){
//     errorMsgElement.innerHTML = `naviagtor.getUSerMedia error:${err.toString()}`;
//   }
// }
// function handleSuccess(stream) {
//     window.stream = stream;
//     video.srcObject = stream;
// }
// // init();

//   // navigator.getMedia = navigator.getUserMedia ||
//   // navigator.webkitGetUserMedia ||
//   // navigator.msGetUserMedia;
  
//   // navigator.getMedia({
//   //   video: true,
//   //   audio: false
//   // }, function(stream) {
//   //   video.src = vendorURL.createObjectURL(stream);
//   //   video.play();
//   // }, function(error) {
//   //   console.log(error)
//   //   //an error occured
//   //   //error.code
//   // });   
// }
// };
const webcam = () => {
  // if (typeof window !== 'undefined'){
    //   console.log('You are on browser');
    // }else{
      //   console.log('You are on the server');
      // }
    document.getElementById("webcamButton").onclick(sayHi); 

    function sayHi(){

      alert('Please select your preferences');
    }
  
  // console.log('working from Port 8080 button onclick');
};
export default webcam;


// Check if webcam access is supported.
// function getUserMediaSupported() {
//   return !!(navigator.mediaDevices &&
//     navigator.mediaDevices.getUserMedia);
// }

// // If webcam supported, add event listener to button for when user
// // wants to activate it to call enableCam function which we will 
// // define in the next step.
// if (getUserMediaSupported()) {
//   enableWebcamButton.addEventListener('click', enableCam);
// } else {
//   console.warn('getUserMedia() is not supported by your browser');
// }

// // Placeholder function for next step. Paste over this in the next step.
// function enableCam(event) {
//   if (!model) {
//     return;
// }


