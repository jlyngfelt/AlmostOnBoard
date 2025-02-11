import express from 'express';
import { fetchVasttrafikData } from './information.js';

const app = express();
const port = 4000;
const url = 'https://ext-api.vasttrafik.se/pr/v4';
      

app.get("/", async (req, res) => {
    try {
        const data = await fetchVasttrafikData();
        const shortName = await data.shortName;
        const shortDirection = await data.shortDirection;

        console.log(shortName);
        console.log(shortDirection);


        
        res.json(data);
    

    } catch (error) {
        console.error('Error handling request:', error);
        res.status(500).json({ error: "Failed to fetch data" });
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});




        const h1 = document.getElementById('h1');
        h1.textContent = shortName;

