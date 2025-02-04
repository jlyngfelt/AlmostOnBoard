import express from 'express';
import axios from 'axios';
import passport from 'passport';
import OAuth2Strategy from 'passport-oauth2';
import fs from 'fs';
import path from 'path';

const app = express();
const port = 4000;

app.get('/', (req, res) => {
    res.json({status: 'good'})
})

app.listen(port, () =>{
    console.log(`server listening to port ${port}`);
})


const url = 'https://ext-api.vasttrafik.se/pr/v4';




// fetch(url)
//   .then((response) => {
    //     // We take the response Promise and return it as JSON.
    //     console.log(response)
    //     return response.json();
    //   })
    //   .then((json) => {
        //     // Now we can now use the JSON as a normal object.
        //     console.log(json);
        //   });
        

        
        console.log('hejsan')
        
        