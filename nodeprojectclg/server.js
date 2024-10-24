const express = require("express"); // initialixze express
const app = express(); // creating object of express
require("dotenv").config(); // dot env initialize
app.use(express()); // create server
// initialize bodyparser
const bodypaser = require('body-parser');
app.use(bodypaser.json());
app.use(
  bodypaser.urlencoded({
    extended: false,
  })
);
const port = process.env.PORT;
const path = require("path"); //  install packadge path which import our database file
// here we import our database file which is in database folder and give the call back
require(path.join(__dirname, "database", "database.js"))();
const userroute = require("./routes/userroutes"); // import my router
app.use(userroute); // use my route

app.listen(port, () => {
  console.log("mera server run ho raya he");
});

app.get("/printhello", function (req, res) {
  console.log(req.body);
  return res.status(200).json({});
});
