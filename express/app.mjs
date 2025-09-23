import express from "express";
import url from "url";
import path from "path";
const app = express();
const port = 3000;
import expressLayouts from "express-ejs-layouts";

// gunakan ejs
app.set("view engine", "ejs");
app.use(expressLayouts);

app.get("/", (req, res) => {
  // res.send("Hello World!");
  // res.json({
  //   nama: "ar",
  //   email: "ar@gmail.com",
  // });
  // res.sendFile("./index.html", { root: __dirname });
  const mahasiswa = [
    {
      nama: "a",
      email: "a@gmail.com",
    },
    {
      nama: "bin",
      email: "bin@gmail.com",
    },
    {
      nama: "r",
      email: "r@gmail.com",
    },
  ];
  res.render("index", {
    layout: "layouts/main-layouts",
    nama: "Ar",
    title: "Halaman Home",
    mahasiswa,
  });
});

app.get("/about", (req, res) => {
  res.render("about", { layout: "layouts/main-layouts", title: "Halaman About" });
});

app.get("/contact", (req, res) => {
  res.render("contact", { layout: "layouts/main-layouts", title: "Halaman Contact" });
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
