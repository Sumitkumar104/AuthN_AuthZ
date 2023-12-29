const express = require("express");
const  {dbconnect}  = require("./config/database");
const app = express();

app.use(express.json());
require("dotenv").config();
const port = process.env.port || 4000;

// mount the other routers
const router = require("./routes/route");
app.use("/api/v1", router);
dbconnect();

app.listen(port, () => {
    console.log(`your app is listening at port = ${port}`);
});

app.get("/", (req, res) => {
    res.send("<h1>welcome to our home page updated</h1>");
});
