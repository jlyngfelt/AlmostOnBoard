import express from "express";
import { fetchVasttrafikData } from "./information.js";
import { getAccessToken } from "./information.js";
import cors from "cors";
import dotenv from "dotenv";
import process from "process";
// import { createServer } from "@vercel/node";
import path from "path";
import { fileURLToPath } from "url";
import { join } from "path";

const app = express();
// const port = process.env.PORT || 4000;
const port = 4000;
const url = "https://ext-api.vasttrafik.se/pr/v4";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.static(join(__dirname, "public")));

// app.get("*.js", function (req, res, next) {
//   res.type("application/javascript");
//   next();
// });

app.get("/", (req, res) => {
  // res.json({ message: "Hello from Vercel!" });
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

dotenv.config();

app.use(cors());

app.get("/data", async (req, res) => {
  console.log("tokensidan");
  try {
    const accesstoken = await getAccessToken();
    const data = await fetchVasttrafikData(accesstoken);
    res.json({data, accesstoken});
  } catch (error) {
    console.error("Error handling request:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

app.get("");

app.get("/data/:token", async (req, res) => {
  console.log("tokensidan");
  try {
    const { token } = req.params;
  //   // if (token) {
    const data = await fetchVasttrafikData(token);
  //   // }
  //   // if (!data) {
  //   //   const accessToken = await getAccessToken();
    

  //   res.json(data);
  } catch (error) {
    console.error("Error handling request:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

export default app;
