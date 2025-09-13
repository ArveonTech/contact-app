import fs from "fs/promises";

export const renderHTML = async (status, res, html) => {
  try {
    const dataFile = await fs.readFile(html, "utf-8");
    res.writeHead(status, {
      "Content-type": `text/html`,
    });
    res.write(dataFile);
  } catch (error) {
    res.writeHead(status, {
      "Content-type": `text/plain`,
    });
    res.write(error.message);
  } finally {
    res.end();
  }
};

const handleFileJson = async () => {
  try {
    await fs.access("./contacts.json");
  } catch (error) {
    await fs.writeFile("./contacts.json", "[]");
  }
};

export const addContact = async (data) => {
  await handleFileJson();

  const fileBuffer = await fs.readFile("./contacts.json");
  const contacts = JSON.parse(fileBuffer);

  contacts.push(data);

  await fs.writeFile("./contacts.json", JSON.stringify(contacts, null, 2));
};
