import express from "express";
const app = express();
const port = 3000;
import { body, validationResult, check } from "express-validator";
import expressLayouts from "express-ejs-layouts";
import { contactsJSON, findContactsJSON, addContact, cekDuplikat } from "./utils/contacts.js";
import session from "express-session";
import cookieParser from "cookie-parser";
import flash from "connect-flash";

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
  res.render("contact", { layout: "layouts/main-layouts", title: "Halaman Contact", contacts, msg: req.flash("msg") });
});

app.get("/contact/add", async (req, res) => {
  res.render("formAddContact", { layout: "layouts/main-layouts", title: "Tambah Data Contact", errors: [] });
});

// proses data contact
app.post(
  "/contact",
  [
    body("nama").custom(async (value) => {
      const duplikat = await cekDuplikat(value);
      if (duplikat) {
        throw new Error("Nama contact sudah terdaftar!");
      }

      return true;
    }),
    check("email", "Email tidak valid!").isEmail(),
    check("noHP", "No HP tidak valid!").isMobilePhone("id-ID"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // return res.status(400).json({ errors: errors.array() });
      res.render("formAddContact", { layout: "layouts/main-layouts", title: "Tambah Data Contact", errors: errors.array() });
    } else {
      addContact(req.body);
      // kirim flash massage
      req.flash("msg", "Data contact berhasil ditambahkan!");
      res.redirect("/contact");
    }
  }
);

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
