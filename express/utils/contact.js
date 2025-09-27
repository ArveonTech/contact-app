import fs from "fs/promises";

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

const findContactsJSON = async (nama) => {
  const contacts = await contactsJSON();

  const contact = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase());

  return contact;
};

export { contactsJSON, findContactsJSON };
