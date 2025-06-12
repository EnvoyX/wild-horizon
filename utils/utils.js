export const getDataByPathParams = (datas, locationType, locationName) => {
  return datas.filter((data) => {
    return data[locationType].toUpperCase() === locationName.toUpperCase();
  });
};
export const getAllData = async (req, res, destinations) => {
  console.log(req.url);
  res.setHeader("Content-Type", "application/json");
  res.statusCode = 200;
  res.write(JSON.stringify(destinations));
  res.end();
};

export const getAllContinents = async (req, res, destinations) => {
  const continents = [
    ...new Set(destinations.map((destination) => destination.continent)),
  ];
  res.setHeader("Content-Type", "application/json");
  res.statusCode = 200;
  res.write(JSON.stringify(continents));
  res.end();
};

export const getContinent = async (req, res, destinations) => {
  const continent = req.url.split("/")[3];
  res.setHeader("Content-Type", "application/json");
  res.statusCode = 200;
  res.write(
    JSON.stringify(getDataByPathParams(destinations, "continent", continent))
  );
  res.end();
};
export const getCountry = async (req, res, destinations) => {
  const country = req.url.split("/")[3];
  res.setHeader("Content-Type", "application/json");
  res.statusCode = 200;
  res.write(
    JSON.stringify(getDataByPathParams(destinations, "country", country))
  );
  res.end();
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
