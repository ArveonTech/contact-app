import express from "express";
const app = express();
const port = 3000;
import expressLayouts from "express-ejs-layouts";
import { contactsJSON, findContactsJSON } from "./utils/contact.js";

// gunakan ejs-layout
app.set("view engine", "ejs");

// third-party middleware
app.use(expressLayouts);

// built-in middleware
app.use(express.static("public"));

// application level middleware
// app.use((req, res, next) => {
//   console.log(`Time : ${Date.now()}`);
//   next();
// });

// app.use((req, res, next) => {
//   console.log(`ini middleware ke-2`);
//   next();
// });

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

app.get("/contact", async (req, res) => {
  const contacts = await contactsJSON();
  res.render("contact", { layout: "layouts/main-layouts", title: "Halaman Contact", contacts });
});

app.get("/contact/:nama", async (req, res) => {
  const contact = await findContactsJSON(req.params.nama);
  res.render("detail", { layout: "layouts/main-layouts", title: "Detail Contact", contact });
});

// middleware = apapun route yg didapat akan menjalankan ini, letak di bawah/jika tidak ada halaman misal
app.use("/", (req, res) => {
  res.status(404);
  res.send("Test");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
