const { MongoClient, ObjectId } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017";
const dbName = "ar";

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();

    // pilih database
    const db = client.db(dbName);

    // 1. menambahkan 1 data ke collection mahasiswa
    // try {
    //   db.collection("mahasiswa").insertOne({ nama: "Andi Kurniawan", email: "andi.kurniawan21@gmail.com" });
    //   console.info("Berhasil menambahkan data");
    // } catch (error) {
    //   console.info("Gagal menambahkan data");
    // }

    // 2. menambahkan banyak data ke collection mahasiswa
    // try {
    //   db.collection("mahasiswa").insertMany([
    //     {
    //       nama: "Laras Putri",
    //       email: "laras.putri@outlook.com",
    //     },
    //     {
    //       nama: "Dimas Saputra",
    //       email: "dimas.saputra77@yahoo.com",
    //     },
    //   ]);
    //   console.info("Berhasil menambahkan banyak data");
    // } catch (error) {
    //   console.info("Gagal menambahkan banyak data");
    // }

    // // 3. menampilkan semua data collection mahasiswa
    // try {
    //   const mahasiswa = await db.collection("mahasiswa").find().toArray();
    //   console.info(mahasiswa);
    // } catch (error) {
    //   console.info("Gagal menampilkan data");
    // }

    // 4. menampilkan semua data collection mahasiswa berdasarkan kategori
    // try {
    //   const mahasiswa = await db
    //     .collection("mahasiswa")
    //     .find({ _id: new ObjectId("68d9fe155b9fc56e02383ed4") })
    //     .toArray();
    //   console.info(mahasiswa);
    // } catch (error) {
    //   console.info(error);
    // }

    // 5. mengubah data collection mahasiswa berdasarkan id
    // try {
    //   db.collection("mahasiswa").updateOne({ _id: new ObjectId("68d9fe155b9fc56e02383ed4") }, { $set: { nama: "saya" } });
    // console.info("Berhasil mengubah data");
    // } catch (error) {
    //   console.info("Gagal mengubah data");
    // }

    // 5. mengubah data collection mahasiswa berdasarkan kategori
    // try {
    //   db.collection("mahasiswa").updateMany(
    //     { nama: "Andi Kurniawan" },
    //     {
    //       $set: {
    //         nama: "Andi Aja",
    //       },
    //     }
    //   );
    //   console.info("Berhasil mengubah data");
    // } catch (error) {
    //   confirm.info("Gagal menghapus banyak data");
    // }

    // 6. menghapus data collection
    // try {
    //   db.collection("mahasiswa").deleteOne({ _id: new ObjectId("68d9fe155b9fc56e02383ed4") });
    //   console.info("Berhasil menghapus data");
    // } catch (error) {
    //   console.info("Gagal menghapus data");
    // }

    // 6. menghapus banyak data collection
    // try {
    //   db.collection("mahasiswa").deleteMany({ nama: "Andi Aja" });
    //   console.info("Berhasil menghapus banyak data");
    // } catch (error) {
    //   console.info(error);
    //   console.info("Gagal menghapus banyak data");
    // }
  } catch (error) {
    console.info(error);
  }
}

run().catch(console.dir);
