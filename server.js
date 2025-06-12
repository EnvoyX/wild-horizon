import http from "node:http";

const PORT = 8000;

const server = http.createServer((req, res) => {
  if (req.url === "/api" && req.method === "GET") {
    console.log(req.url);
    res.end("This is from the server");
  }
});

server.listen(PORT, () => console.log(`Connected on port: ${PORT}`));
