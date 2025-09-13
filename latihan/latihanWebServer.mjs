import http from "http";
import { handleGet, handlePost } from "./route.mjs";

const server = http.createServer();
const port = 3000;

server
  .on("request", (req, res) => {
    const url = req.url;

    if (req.method === "POST") {
      handlePost(req, res);
    } else {
      handleGet(url, res);
    }
  })
  .listen(port);
