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

const contactsJSON = async () => {
  const fileBuffer = await fs.readFile(`./data/contacts.json`, "utf-8");
  const contacts = JSON.parse(fileBuffer);

  return contacts;
};

const simpanContact = async (nama, email, noHP) => {
  const contact = { nama, noHP, email };

  const contacts = await contactsJSON();

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

const listContact = async () => {
  const contacts = await contactsJSON();

  console.info(chalk.cyan.inverse.bold("Daftar nama kontak : "));
  contacts.forEach((contact, i) => {
    console.info(`${i + 1}. ${contact.nama} - ${contact.noHP}`);
  });
};

const detailContact = async (nama) => {
  const contacts = await contactsJSON();

  const contact = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase());

  if (!contact) {
    console.info(chalk.red.inverse(`${nama} tidak ada di daftar contact`));
    return false;
  }

  console.info(`nama : ${chalk.blue.inverse(contact.nama)} - email : ${chalk.blue.inverse(contact.email ? contact.email : "tidak ada email")} - noHP : ${chalk.blue.inverse(contact.noHP)}`);
};

const deleteContact = async (nama) => {
  const contacts = await contactsJSON();

  const contactsNew = contacts.filter((contact) => contact.nama.toLowerCase() !== nama.toLowerCase());

  if (contacts.length === contactsNew.length) {
    console.info(chalk.red.inverse(`${nama} tidak ada di daftar contact`));
    return false;
  }

  await fs.writeFile("data/contacts.json", JSON.stringify(contactsNew, null, 2));

  console.info(`contact : ${chalk.red.inverse(`${nama} berhasil dihapus!`)}`);
};

export { simpanContact, listContact, detailContact, deleteContact };
