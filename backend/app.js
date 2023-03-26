const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const uri = "mongodb://127.0.0.1:27017/schoolManagementSystem";
mongoose.connect(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
	email: { type: String, unique: true },
	password: String,
});

const User = mongoose.model("Users", userSchema);

app.post("/createUser", (req, res) => {
	const { email, password } = req.body;
	bcrypt.hash(password, 10, function (err, hash) {
		const user = new User({
			email: email,
			password: hash,
		});
		user.save();
	});
});

app.listen(process.env.PORT, () => {
	console.log("running on port " + process.env.PORT);
});
