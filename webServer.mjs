// import http from "http";
// import fs from "fs/promises";

// const server = http.createServer();
// const port = 3000;

// const renderHTML = async (path, res) => {
//   try {
//     const data = await fs.readFile(path, "utf-8");
//     res.writeHead(200, { "Content-Type": "text/html" });
//     res.write(data);
//   } catch (err) {
//     res.writeHead(404, { "Content-Type": "text/html" });
//     res.write("Error: file not found");
//   } finally {
//     res.end();
//   }
// };

// server
//   .on("request", (req, res) => {
//     const url = req.url;

//     if (url === "/about") {
//       renderHTML("./index.html", res);
//     } else if (url === "/contact.html") {
//       renderHTML("./contact.html", res);
//     } else {
//       res.writeHead(200, { "Content-Type": "text/html" });
//       res.write(`<h1>hello world!</h1>`);
//       res.end();
//     }
//   })
//   .listen(port, () => {
//     console.info(`Server is listening on port ${port}..`);
//   });
