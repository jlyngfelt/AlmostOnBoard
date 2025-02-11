import express from 'express';
import { fetchVasttrafikData } from './information.js';
import cors from 'cors';
import dotenv from 'dotenv';
import process from 'process';


const app = express();
const port = 4000;
const url = 'https://ext-api.vasttrafik.se/pr/v4';

dotenv.config();

      
app.use(cors());

app.get("/data", async (req, res) => {
    try {
        const data = await fetchVasttrafikData();
        
        res.json(data);

    } catch (error) {
        console.error('Error handling request:', error);
        res.status(500).json({ error: "Failed to fetch data" });
    }
});


app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});


