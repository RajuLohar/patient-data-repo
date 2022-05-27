const express = require("express");
require("./db/mongoose");
const patientRouter = require("./routers/patient");


const app = express();

app.use(express.json());
app.use(patientRouter);

module.exports=app