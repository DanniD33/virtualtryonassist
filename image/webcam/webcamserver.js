//This file is what's sending out video prompt because we are unable to access the dom
//it acts as our endpoints

import express from 'express';
const app = express();
let PORT = 8080;
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
app.use(bodyParser.json());
// import htmlContent from './videoCap.html';       
// import fs from 'fs';  
// const files = fs.readFile("videoCap.html");


// async function readWebcam(videoCap) {
//   return new Promise(resolve => {
//     let header;
//     const label = `read2-${file}`;
//     console.time(label);
//     const stream = fs.createReadStream(file, {encoding: 'utf8'});
//     stream.on('data', data => {
//       header = data.split(/\n/)[0];
//       stream.destroy();
//     });
//     stream.on('close', () => {
//       console.timeEnd(label);
//       resolve();
//     });
//   });
// }






// fs.readFile(__dirname + '/videoCap.html', )
// //this send our webcam capture after we create our profile
// const loadingCam = () => {

  app.get('/', (req, res) => {
      
    res.send('WebcamServer Home');
  });



  //want to be able to get the HTML doc that includes our webcam capture 

  app.get('/webcam', (req, res) => {
    // res.sendFile(webcam)
    const __filename = fileURLToPath(import.meta.url);
    
    const __dirname = path.dirname(__filename);
    
    res.sendFile(__dirname + '/videoCap.html');
    // res.send(webcam());
    })
  // };
    
  // export default loadingCam; 
  
    
   
  
    app.listen(PORT, () => {
      console.log(`Listen on port ${PORT}`);
    });
    
    // export default app;
    // // });



//request body allows us to access data in a string or JSON object from the client/ 
  //generally used to receive/read data through POST and PUT requests
//request body
//closure that parses http request into JavaScript objects
