const dotenv = require("dotenv").config();
const express = require("express");

var app = express();
let port = process.env.PORT || 4000;

app.listen(process.env.PORT, () =>
	console.log("running on port " + process.env.PORT)
);
