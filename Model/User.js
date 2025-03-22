const mongoose = require("mongoose");
const schema = mongoose.Schema;
const { DB1 } = require("../DB/Db");
const { SecretDB } = require("../DB/DB2");
const User = new schema({
  Name: {
    type: String,
    required: true,
  },
  FcmId: String,
  Location: String,
  Password: String,
});
module.exports = DB1.model("user", User);
