import axios from 'axios';
import qs from 'qs';
import dotenv from 'dotenv';

let stopName = "9021014004790000";
let platform = "A";
let shortDirection = '';

let data = qs.stringify({
  'grant_type': 'client_credentials',
  'client_id': process.env.VASTTRAFIK_ID,
  'client_secret': process.env.VASTTRAFIK_SECRET,
  'scope': '' 
});

let configAccessToken = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://ext-api.vasttrafik.se/token',
  headers: { 
    'Content-Type': 'application/x-www-form-urlencoded', 
    'Cookie': 'TS0153fc3c=0166f7c44800780e189cbec7cb1818e1c5a6e54bfb9144e42999c2c6378f289b17b3bbb721825f65ff40b5d462a5d9dc8446b98069; route=85bec1da72835c0'
  },
  data : data
};

axios.request(configAccessToken)
.then((response) => {
 let accessResponse = response.data;
 let accessToken = accessResponse["access_token"];

 let configGetAPI = {
  method: 'get',
  maxBodyLength: Infinity,
  url: `https://ext-api.vasttrafik.se/pr/v4/stop-areas/${stopName}/departures?platforms=${platform}&timeSpanInMinutes=1439&maxDeparturesPerLineAndDirection=3&limit=3&offset=0&includeOccupancy=false`,
  headers: { 
    'Authorization': `Bearer ${accessToken}`, 
    'Cookie': 'TS0153fc3c=0166f7c4487879013886c34e0d6cfcd1d32e206287b33a7b993ec0d5da52bd258df906419314d846ff971e2fe99c7f1b3fdf3e0c49; route=85bec1da72835c0'
  },
  data : data
};
 axios.request(configGetAPI)
 .then((response) => {
 
  let allInformation = response.data
  let shortDirection = allInformation['results'][0]['serviceJourney']['directionDetails']['shortDirection'];
  let shortName = allInformation['results'][0]['serviceJourney']['line']['shortName'];
  let transportMode = allInformation['results'][0]['serviceJourney']['line']['transportMode'];
  let stopPointName = allInformation['results'][0]['stopPoint']['name'];
  let isCancelled = allInformation['results'][0]['isCancelled'];
  let estTime = allInformation['results'][0]['estimatedOtherwisePlannedTime'];
  
  console.log(shortDirection, shortName, transportMode, stopPointName, isCancelled, estTime)
 })
 .catch((error) => {
   console.log(error);
 });

})
.catch((error) => {
  console.log(error);
});


//What we want to save from JSON-response
// "serviceJourney": { 
// 	”shortDirection”
// }

// ”line”: {
// 	”shortName”
// 	”transportMode”
// }

// "stopPoint": { 
// 	”name”
// }

// "estimatedOtherwisePlannedTime"
//  "isCancelled"



