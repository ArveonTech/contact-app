const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");
const { body, validationResult, check } = require("express-validator");
const methodOverride = require("method-override");

require("./utils/db");
const Contact = require("./model/contact");

const app = express();
const port = 3000;

// built-in middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// konfigurasi
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
app.use(methodOverride("_method"));

// gunakan ejs-layout
app.set("view engine", "ejs");

// third-party middleware
app.use(expressLayouts);

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

// halaman tambah contact
app.get("/contact/add", async (req, res) => {
  res.render("formAddContact", { layout: "layouts/main-layouts", title: "Tambah Data Contact", errors: [] });
});

// proses tambah data contact
app.post(
  "/contact",
  [
    body("nama").custom(async (value) => {
      const duplikat = await Contact.findOne({ nama: value });
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
      res.render("formAddContact", { layout: "layouts/main-layouts", title: "Tambah Data Contact", errors: errors.array() });
    } else {
      try {
        Contact.insertMany(req.body);
        req.flash("msg", "Data contact berhasil ditambahkan!");
        res.redirect("/contact");
      } catch (error) {
        console.info(`Gagal menambah data ${error.message}`);
      }
    }
  }
);

// proses hapus data contact
app.delete("/contact", async (req, res) => {
  try {
    await Contact.deleteOne({ nama: req.body.nama });
    req.flash("msg", "Data contact berhasil dihapus!");
    res.redirect("/contact");
  } catch (error) {
    console.info(`Gagal menghapus data ${error.message}`);
  }
});

// halaman edit data contact
app.get("/contact/edit/:nama", async (req, res) => {
  const contact = await Contact.findOne({ nama: req.params.nama });

  res.render("formEditContact", { layout: "layouts/main-layouts", title: "Form Ubah Data Contact", errors: [], contact });
});

// proses edit data contact
app.put(
  "/contact",
  [
    body("nama").custom(async (value, { req }) => {
      const duplikat = await Contact.findOne({ nama: value });
      if (value !== req.body.oldNama && duplikat) {
        throw new Error("Nama contact sudah terdaftar!");
      }

      return true;
    }),
    check("email", "Email tidak valid!").isEmail(),
    check("noHP", "No HP tidak valid!").isMobilePhone("id-ID"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("formEditContact", { layout: "layouts/main-layouts", title: "Form Ubah Data Contact", errors: errors.array(), contact: req.body });
    } else {
      try {
        await Contact.updateOne(
          { _id: req.body._id },
          {
            $set: {
              nama: req.body.nama,
              noHP: req.body.noHP,
              email: req.body.email,
            },
          }
        );
        req.flash("msg", "Data contact berhasil dirubah!");
        res.redirect("/contact");
      } catch (error) {
        console.info(`Gagal mengedit data ${error.message}`);
      }
    }
  }
);

// halaman detail contact
app.get("/contact/:nama", async (req, res) => {
  const contact = await Contact.findOne({ nama: req.params.nama });

  res.render("detail", { layout: "layouts/main-layouts", title: "Detail Contact", contact });
});

app.listen(port, () => {
  console.info(`Mongo Contact App || listening at http://localhost:${port}`);
});
