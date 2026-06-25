const mongoose = require("mongoose");
const Plant = require("./models/Plants");

const data = require("./data/plants.json");

main()
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(
    "mongodb://127.0.0.1:27017/virtualHerbalGarden"
  );
}

async function seedDB() {
  await Plant.deleteMany({});
  await Plant.insertMany(data);

  console.log("Data Inserted Successfully");
  mongoose.connection.close();
}

seedDB();