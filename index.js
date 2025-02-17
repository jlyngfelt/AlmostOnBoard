import express from "express";
import { fetchVasttrafikData } from "./functions.js";
import { getAccessToken } from "./functions.js";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { join } from "path";

import { searchForStopPoint } from './search.js';


const app = express();
const port = 4000;


const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.static(join(__dirname, "public")));

dotenv.config();

app.use(cors());

// TEST START
app.use(express.json());
app.use(express.static('public'));

app.post('/search', async (req, res) => {
  try {
      const { searchText } = req.body;
      const accessToken = await getAccessToken();
      const results = await searchForStopPoint(accessToken, searchText);
      res.json(results);
      
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

//TEST END

app.get("/data", async (req, res) => {
  try {
    const accesstoken = await getAccessToken();
    const data = await fetchVasttrafikData(accesstoken);
    res.json({data, accesstoken});
  } catch (error) {
    console.error("Error handling request:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

app.get("/data/:token", async (req, res) => {
  try {
    const { token } = req.params;
    if (!token) {
      return res.redirect('/data');
    }

try {
      const data = await fetchVasttrafikData(token);
      res.json(data);
    } catch (tokenError) {
      // Om token är ogiltig, omdirigera till /data för att få ny token
      console.log("Token invalid, redirecting to get new token");
      return res.redirect('/data');
    }
  } catch (error) {
    console.error("Error handling request:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

export default app;
