// mengambil argumen dari command line
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { simpanContact, listContact, detailContact, deleteContact } from "./contacts.mjs";

yargs(hideBin(process.argv))
  .command({
    command: "add",
    describe: "Menambahkan contact baru",
    builder: {
      nama: {
        describe: "Nama Lengkap",
        demandOption: true,
        type: "string",
      },
      email: {
        describe: "Email",
        demandOption: false,
        type: "string",
      },
      noHp: {
        describe: "No Handphone",
        demandOption: true,
        type: "string",
      },
    },
    handler(argv) {
      simpanContact(argv.nama, argv.email, argv.noHp);
    },
  })
  .command({
    command: "list",
    describe: "Menampilkan semua nama & no HP contact",
    handler() {
      listContact();
    },
  })
  .command({
    command: "detail",
    describe: "Menampilkan detail contact berdasarkan nama",
    builder: {
      nama: {
        describe: "Nama contact",
        demandOption: true,
        type: "string",
      },
    },
    handler(argv) {
      detailContact(argv.nama);
    },
  })
  .command({
    command: "delete",
    describe: "Menghapus contact berdasarkan nama",
    builder: {
      nama: {
        describe: "Nama contact",
        demandOption: true,
        type: "string",
      },
    },
    handler(argv) {
      deleteContact(argv.nama);
    },
  })
  .demandCommand()
  .parse();
