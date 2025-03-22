const mongoose = require("mongoose");
const DbConfig =
  "mongodb+srv://jeyaprakash4587:Prakash4587@cluster0.d84x5.mongodb.net/SecMessages?retryWrites=true&w=majority&appName=Cluster0";
const SecretDB = mongoose.createConnection(DbConfig);

module.exports = { SecretDB };
