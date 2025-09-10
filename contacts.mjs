import fs from "fs/promises";
import chalk from "chalk";
import validator from "validator";

// buat folder jika tidak ada
const dirPath = "./data";
try {
  await fs.access(dirPath);
} catch (error) {
  await fs.mkdir(dirPath);
}

// buat file jika tidak ada
const dataPath = "./data/contacts.json";
try {
  await fs.access(dataPath);
} catch (error) {
  await fs.writeFile(dataPath, "[]", "utf-8");
}

const simpanContact = async (nama, email, noHP) => {
  const contact = { nama, noHP, email };
  const fileBuffer = await fs.readFile(`./data/contacts.json`, "utf-8");
  const contacts = JSON.parse(fileBuffer);

  // cek duplikat
  const duplikatNama = contacts.find((contact) => contact.nama === nama);
  if (duplikatNama) {
    console.info(chalk.red.inverse.bold("Contact sudah terdaftar, gunakan nama lain!"));
    return false;
  }

  // cek email kosong
  if (email) {
    if (!validator.isEmail(email)) {
      console.info(chalk.red.inverse.bold("Email tidak valid"));
      return false;
    }
  }

  if (!validator.isMobilePhone(noHP, "id-ID")) {
    console.info(chalk.red.inverse.bold("Nomor HP tidak valid"));
    return false;
  }

  contacts.push(contact);

  await fs.writeFile("data/contacts.json", JSON.stringify(contacts, null, 2));

  console.info(chalk.green("Terimakasih sudah memasukkan data."));
};

export { simpanContact };
