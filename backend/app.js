const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const jwtValidator = require("./middlewares/jwtValidator");

const signupRoute = require("./routes/signup");
const signinRoute = require("./routes/signin");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const uri = "mongodb://127.0.0.1:27017/schoolManagementSystem";
mongoose.connect(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
app.use("/signup", signupRoute);
app.use("/signin", signinRoute);

app.listen(process.env.PORT, () => {
	console.log("running on port " + process.env.PORT);
});
