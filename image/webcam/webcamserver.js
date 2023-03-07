//This file is what's sending out video prompt


import express from 'express';
const app = express();
let PORT = 8080;
import webcam from './webcam.js';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
// import videoCap from './videoCap.html';
app.use(bodyParser.json());         




//this send our webcam capture after we create our profile

  app.get('/', (req, res) => {
    const __filename = fileURLToPath(import.meta.url);
    
    const __dirname = path.dirname(__filename);
    
    res.sendFile(__dirname + '/videoCap.html');
    // res.send(webcam());
  });
  
  
  // app.get('/webbie', (req, res) => {
    //   const __filename = fileURLToPath(import.meta.url);
    
    // const __dirname = path.dirname(__filename);
    
    //   res.sendFile(__dirname + '/webcam.js');
    // // res.send(webcam);
    // });
    
    
  
    app.listen(PORT, () => {
      console.log(`Listen on port ${PORT}`);
    });
    
    export default app;
    // });



//request body allows us to access data in a string or JSON object from the client/ 
  //generally used to receive/read data through POST and PUT requests
//request body
//closure that parses http request into JavaScript objects

