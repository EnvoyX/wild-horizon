import http from "node:http";
import {
  getAllContinents,
  getAllCountries,
  getContinent,
  getCountry,
  getDataByQueryParams,
  handleRouteError,
  sendJSONResponse,
} from "./utils/utils.js";
import { getDataFromDB } from "./database/db.js";

const PORT = 8000;

const server = http.createServer(async (req, res) => {
  const destinations = await getDataFromDB();

  const urlObj = new URL(req.url, `http://${req.headers.host}`);

  const queryObj = Object.fromEntries(urlObj.searchParams);

  console.log(queryObj);

  if (urlObj.pathname === "/api" && req.method === "GET") {
    let filteredData = destinations;

    filteredData = getDataByQueryParams(filteredData, queryObj);

    sendJSONResponse(res, 200, filteredData);
  } else if (req.url === "/api/continents" && req.method === "GET") {
    await getAllContinents(req, res, destinations);
  } else if (req.url === "/api/countries" && req.method === "GET") {
    await getAllCountries(req, res, destinations);
  } else if (req.url.startsWith("/api/continent") && req.method === "GET") {
    await getContinent(req, res, destinations);
  } else if (req.url.startsWith("/api/country") && req.method === "GET") {
    await getCountry(req, res, destinations);
  } else {
    await handleRouteError(req, res);
  }
});

server.listen(PORT, () => console.log(`Connected on port: ${PORT}`));
