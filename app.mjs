import { ask, simpanContact } from "./contacts.js";

const form = async () => {
  const name = await ask("Masukkan nama anda : ");
  const noHP = await ask("Masukkan No HP anda : ");
  const email = await ask("Masukkan email anda : ");

  simpanContact({ name, noHP, email });
};

form();
