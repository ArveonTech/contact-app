const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/ar");

// menambah 1 data
// const contact1 = new Contact({
//   nama: "kasur",
//   noHP: "0802847382922",
//   email: "kasur@gmail.com",
// });

// simpan ke collection
// contact1
//   .save()
//   .then((result) => console.info(result))
//   .catch((error) => console.info(error));
