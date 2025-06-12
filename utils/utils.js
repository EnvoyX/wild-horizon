export const sendJSONResponse = (res, statusCode, payload) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.statusCode = statusCode;
  res.end(JSON.stringify(payload));
};

export const getDataByPathParams = (datas, locationType, locationName) => {
  return datas.filter((data) => {
    return data[locationType].toLowerCase() === locationName.toLowerCase();
  });
};

export const getAllData = async (req, res, destinations) => {
  //   console.log(req.url);
  sendJSONResponse(res, 200, destinations);
};

export const getAllContinents = async (req, res, destinations) => {
  const continents = [
    ...new Set(destinations.map((destination) => destination.continent)),
  ];
  sendJSONResponse(res, 200, continents);
};

export const getAllCountries = async (req, res, destinations) => {
  const countries = [
    ...new Set(destinations.map((destination) => destination.country)),
  ];
  sendJSONResponse(res, 200, countries);
};

export const getContinent = async (req, res, destinations) => {
  const continent = req.url.split("/")[3];
  const filteredDatas = getDataByPathParams(
    destinations,
    "continent",
    continent
  );
  sendJSONResponse(res, 200, filteredDatas);
};
export const getCountry = async (req, res, destinations) => {
  const country = req.url.split("/")[3];
  const filteredDatas = getDataByPathParams(destinations, "country", country);
  sendJSONResponse(res, 200, filteredDatas);
};

export const getDataByQueryParams = (datas, queryParams) => {
  if (!queryParams) {
    return datas;
  }
  return datas.filter((data) => {
    return Object.keys(queryParams).every((key) => {
      return (
        data[key].toString().toLowerCase() ===
        queryParams[key].toString().toLowerCase()
      );
    });
  });
};

export const handleRouteError = async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.statusCode = 404;
  res.end(
    JSON.stringify({
      error: "not found",
      message: "The requested route does not exist",
    })
  );
};
