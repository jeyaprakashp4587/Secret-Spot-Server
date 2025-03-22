const express = require("express");
const http = require("http");
const cors = require("cors");
const app = express();
const Login = require("./Router/Login");
const bodyParser = require("body-parser");
const { DB1 } = require("./DB/Db");
const { SecretDB } = require("./DB/DB2");
const Message = require("./Router/Message");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));
// connect DB1
DB1.on("connected", () => console.log("DB1 Connected"));
SecretDB.on("connected", () => console.log("DB2 Connected"));
// call all middlw ware toutes
app.use("/Login", Login);
app.use("/Message", Message);
// listen
const port = 8080 || process.env;
app.listen(port, () => console.log(`Server is listening on port ${port}`));
