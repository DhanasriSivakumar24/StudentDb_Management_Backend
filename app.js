require("dotenv").config();
const express = require("express");

const studentsRoute = require("./routes/students/studentRoute.js");
const db = require("./db/index.js")

const app = new express(); //initalizing the express server's object in this variable name app
const port = 5050; //port number can be anything  more thsn 3000

db();
app.use(express.json());
app.use("/studentDb",studentsRoute);

app.listen(port, () => {
    console.log(`Executed succefully on the port http://localhost:${port}`);
    console.log("Successfully Executed");
});
