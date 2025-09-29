const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");

require("./utils/db");
const Contact = require("./model/contact");

const app = express();
const port = 3000;

// konfigurasi flash
app.use(cookieParser());
app.use(
  session({
    cookie: { maxAge: 6000 },
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());

// gunakan ejs-layout
app.set("view engine", "ejs");

// third-party middleware
app.use(expressLayouts);

// built-in middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// halaman home
app.get("/", (req, res) => {
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

// halaman about
app.get("/about", (req, res) => {
  res.render("about", { layout: "layouts/main-layouts", title: "Halaman About" });
});

// halaman contact
app.get("/contact", async (req, res) => {
  const contacts = await Contact.find();
  res.render("contact", { layout: "layouts/main-layouts", title: "Halaman Contact", contacts, msg: req.flash("msg") });
});

// halaman detail contact
app.get("/contact/:nama", async (req, res) => {
  const contact = await Contact.findOne({ nama: req.params.nama });

  res.render("detail", { layout: "layouts/main-layouts", title: "Detail Contact", contact });
});

app.listen(port, () => {
  console.info(`Mongo Contact App || listening at http://localhost:${port}`);
});
