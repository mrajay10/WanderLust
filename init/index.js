const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

mongoose.connect('mongodb://127.0.0.1:27017/wanderlust')
  .then(() => console.log('Connection Successful'))
  .catch((err) => console.log(err));

const initDB = async() => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({ ...obj, owner: "6a7521dc4019209769c59d32" }));
    await Listing.insertMany(initData.data);
    console.log("data was initialize");
};
initDB();