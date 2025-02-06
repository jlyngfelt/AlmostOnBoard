import axios from 'axios';
import qs from 'qs';
import dotenv from 'dotenv';

let data = qs.stringify({
  'grant_type': 'client_credentials',
  'client_id': process.env.VASTTRAFIK_ID,
  'client_secret': process.env.VASTTRAFIK_SECRET,
  'scope': '' 
});

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://ext-api.vasttrafik.se/token',
  headers: { 
    'Content-Type': 'application/x-www-form-urlencoded', 
    'Cookie': 'TS0153fc3c=0166f7c44800780e189cbec7cb1818e1c5a6e54bfb9144e42999c2c6378f289b17b3bbb721825f65ff40b5d462a5d9dc8446b98069; route=85bec1da72835c0'
  },
  data : data
};

axios.request(config)
.then((response) => {
 let accessResponse = response.data;
 let accessToken = accessResponse["access_token"];
  
})
.catch((error) => {
  console.log(error);
});