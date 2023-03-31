const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
// const dotenv = require("dotenv").config();

const userSchema = new mongoose.Schema({
	// name: {
	// 	type: String,
	// 	required: true,
	// },
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	// phoneNumber: {
	// 	type: String,
	// 	required: true,
	// },
	// address: {
	// 	type: String,
	// 	required: true,
	// },
	// gender: {
	// 	type: String,
	// 	enum: ["male", "female", "other"],
	// },
	// role: {
	// 	type: String,
	// 	enum: ["student", "faculty", "admin"],
	// 	default: "student",
	// },
	date: {
		type: Date,
		default: Date.now,
	},
	jwtToken: { type: String },
});

userSchema.methods.generateJWT = function () {
	const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
		expiresIn: "10m",
	});
	this.token = token;
	return this.save().then(() => token);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
