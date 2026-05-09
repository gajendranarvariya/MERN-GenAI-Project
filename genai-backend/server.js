// import app from "./src/app.js";
require("dotenv").config();
const app = require("./src/app");
const connectToDB = require("./src/config/database");

connectToDB();

app.listen(3000,()=>console.log('server listening on port no 3000'));