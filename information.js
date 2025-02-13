import axios from "axios";
import qs from "qs";

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
  const stopName = "9021014004790000";
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

    return {
      shortDirection:
        allInformation.results[0].serviceJourney.directionDetails
          .shortDirection,
      shortName: allInformation.results[0].serviceJourney.line.shortName,
      transportMode:
        allInformation.results[0].serviceJourney.line.transportMode,
      stopPointName: allInformation.results[0].stopPoint.name,
      isCancelled: allInformation.results[0].isCancelled,
      estTime: allInformation.results[0].estimatedOtherwisePlannedTime,
      rawData: allInformation,
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

// const hej = getAccessToken();

// console.log(hej);
