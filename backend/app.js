const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const uri = "mongodb://127.0.0.1:27017/";

// schema

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

async function connect() {
	await mongoose
		.connect(uri)
		.then(() => console.log("Database Connected"))
		.catch((err) => console.error(err));
}
// connect();

const userSchema = new mongoose.Schema({
	firstName: { type: String, required: true },
	lastName: { type: String },
	email: { type: String, required: true, unique: true },
	role: { type: String, required: true },
	gender: { type: String },
});
mongoose.model("user", userSchema);

app.post("/", (req, res) => {
	res.send(req.body);
});

app.listen(process.env.PORT, () => {
	console.log("running on port " + process.env.PORT);
});
