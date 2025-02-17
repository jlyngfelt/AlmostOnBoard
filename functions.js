import axios from "axios";
import qs from "qs";
import { getDepartures } from "./departureUtils.js";

export const getAccessToken = async () => {
  const data = qs.stringify({
    grant_type: "client_credentials",
    client_id: process.env.VASTTRAFIK_ID,
    client_secret: process.env.VASTTRAFIK_SECRET,
    scope: "",
  });

  const configAccessToken = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://ext-api.vasttrafik.se/token",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: data,
  };

  try {
    const response = await axios.request(configAccessToken);
    return response.data.access_token;
  } catch (error) {
    console.error("Error getting access token:", error);
    throw error;
  }
};

const getDepartureData = async (accesstoken) => {
  const stopName = "9021014003640000";
  const platform = "B";

  const configGetAPI = {
    method: "get",
    maxBodyLength: Infinity,
    url: `https://ext-api.vasttrafik.se/pr/v4/stop-areas/${stopName}/departures?platforms=${platform}&timeSpanInMinutes=1439&maxDeparturesPerLineAndDirection=3&limit=3&offset=0&includeOccupancy=false`,
    headers: {
      Authorization: `Bearer ${accesstoken}`,
    },
  };

  try {
    const response = await axios.request(configGetAPI);
    const allInformation = response.data;

    const departures = getDepartures(allInformation);

    return {

      firstDeparture: departures[0] ?? null,
      secondDeparture: departures[1] ?? null,
      thirdDeparture: departures[2] ?? null,

    };
  } catch (error) {
    console.error("Error getting departure data:", error);
    throw error;
  }
};

export const fetchVasttrafikData = async (token) => {
  try {
    const departureData = await getDepartureData(token);
    return departureData;
  } catch (error) {
    console.error("Error in fetchVasttrafikData:", error);
    throw error;
  }
};
