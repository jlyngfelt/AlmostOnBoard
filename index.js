import express from 'express';
import axios from 'axios';
import passport from 'passport';
import OAuth2Strategy from 'passport-oauth2';
import fs from 'fs';
import path from 'path';
import allInformation from './information.js'

const app = express();
const port = 4000;

app.get('/', (req, res) => {
    res.json({status: 'good'})
})


// let shortDirection = allInformation['results'][0]['serviceJourney']['directionDetails']['shortDirection'];
// let shortName = allInformation['results'][0]['serviceJourney']['line']['shortName'];
// let transportMode = allInformation['results'][0]['serviceJourney']['line']['transportMode'];
// let stopPointName = allInformation['results'][0]['stopPoint']['name'];
// let isCancelled = allInformation['results'][0]['isCancelled'];
// let estTime = allInformation['results'][0]['estimatedOtherwisePlannedTime'];

console.log(allInformation);

const url = 'https://ext-api.vasttrafik.se/pr/v4';

app.listen(port, () =>{
    console.log(`server listening to port ${port}`);
})


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
        

        

        
        