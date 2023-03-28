import express from 'express';
const app = express();
let PORT = 8080;
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// app.use(express.json());
// app.use(express.urlencoded({extended:true}));
import userController from './controller/userController.js';


// app.use('/', express.static(path.join(__dirname, '../webcam')));
// console.log(__dirname);

app.use(function(err, req,res, next){
  console.error(err.stack);
  res.status(500).send('something broke on our end');
})



//Send Home page od webcamserver (landing page before actual camera access)
  app.get('/', (req, res) => {
    res.send('WebcamServer Home');
  });



  //want to be able to get the HTML doc that includes our webcam capture 

  app.get('/webcam', userController.getCamera, (req, res) => {
    // res.sendFile(webcam)
    return res.status(200).json(res.locals.getCamera);
    });
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
