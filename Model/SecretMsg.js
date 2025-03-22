const mongoose = require("mongoose");
const schema = mongoose.Schema;
const { SecretDB } = require("../DB/DB2");

const secretSchema = new schema({
  message: String,
  messageSender: String,
  location: {
    type: { type: String, enum: ["Point"], required: true },
    coordinates: { type: [Number], required: true },
  },
});
// Create a 2dsphere index for location-based queries
secretSchema.index({ location: "2dsphere" });

module.exports = SecretDB.model("secMessages", secretSchema);
