const mongoose = require("mongoose");
const DbConfig =
  "mongodb+srv://jeyaprakashp431:ZR45w6jm5DSLyaDZ@secretspot.lh7x8.mongodb.net/UserData?retryWrites=true&w=majority&appName=secretSpot";
const DB1 = mongoose.createConnection(DbConfig);

module.exports = { DB1 };
