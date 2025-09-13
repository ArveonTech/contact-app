import { addContact, renderHTML } from "./utils.mjs";

export const handleGet = (url, res) => {
  switch (url) {
    case "/":
      renderHTML(200, res, "./index.html");
      break;
    case "/about":
      renderHTML(200, res, "./about.html");
      break;
    case "/contact":
      renderHTML(200, res, "./contact.html");
      break;
    default:
      renderHTML(404, res, "./404.html");
  }
};

export const handlePost = (req, res) => {
  let reqData = "";
  let dataForm = null;

  req.on("data", (data) => {
    reqData += data;
  });

  req.on("end", () => {
    const params = new URLSearchParams(reqData);
    dataForm = {
      nama: params.get("nama"),
      email: params.get("email"),
    };

    if (!dataForm.nama || !dataForm.email) {
      res.writeHead(400, { "Content-Type": "text/html" });
      res.end("<h1>Nama dan Email wajib diisi!</h1>");
      return;
    }

    res.writeHead(200, {
      "Content-type": `text/html`,
    });

    res.write(`<h1>Hallo ${dataForm.nama}, emailmu ${dataForm.email} sudah kami terima!</h1>`);

    addContact(dataForm);

    reqData = "";
    dataForm = null;

    res.end();
  });
};
