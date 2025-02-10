import express from 'express';
import axios from 'axios';
import passport from 'passport';
import OAuth2Strategy from 'passport-oauth2';
import fs from 'fs';
import path from 'path';
import { endpointData } from './information.js';

const app = express();
const port = 4000;
const url = 'https://ext-api.vasttrafik.se/pr/v4';

app.get('/', (req, res) => {
    res.json({status: 'good'})
})

console.log(endpointData.shortName);


app.listen(port, () =>{
    console.log(`server listening to port ${port}`);
})


        

        

        
        