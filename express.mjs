import express from "express";
import url from "url";
import path from "path";
const app = express();
const port = 3000;

// ambil __filename dan __dirname
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get("/", (req, res) => {
  // res.send("Hello World!");
  // res.json({
  //   nama: "ar",
  //   email: "ar@gmail.com",
  // });
  res.sendFile("./index.html", { root: __dirname });
});

app.get("/about", (req, res) => {
  res.sendFile("./about.html", { root: __dirname });
});

app.get("/contact", (req, res) => {
  res.sendFile("./contact.html", { root: __dirname });
});

app.get("/product/:id", (req, res) => {
  res.send(`Proudct ID : ${req.params.id} <br> Category ID : ${req.query.category}`);
});

// middleware = apapun route yg didapat akan menjalankan ini, letak di bawah/jika tidak ada halaman misal
app.use("/", (req, res) => {
  res.status(404);
  res.send("Test");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
