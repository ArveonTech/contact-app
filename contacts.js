import fs from "fs/promises";
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

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

const ask = (query) => {
  return new Promise((resolve) => {
    rl.question(query, (answer) => {
      resolve(answer);
    });
  });
};

const simpanContact = async ({ name, noHP, email }) => {
  const contact = { name, noHP, email };
  const fileBuffer = await fs.readFile(`./data/contacts.json`, "utf-8");
  const contacts = JSON.parse(fileBuffer);

  contacts.push(contact);

  await fs.writeFile("data/contacts.json", JSON.stringify(contacts, null, 2));

  console.info("Terimakasih sudah memasukkan data.");

  rl.close();
};

export { ask, simpanContact };
