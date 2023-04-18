const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
	fName: {
		type: String,
		required: true,
	},
	lName: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	phoneNumber: {
		type: String,
	},
	address: {
		type: String,
	},
	gender: {
		type: String,
	},
	role: {
		type: String,
		required: true,
	},
	emergencyContact: {
		type: String,
	},
	studentClass: {
		type: String,
	},
	section: {
		type: String,
	},
	guardianName: {
		type: String,
	},
	relaton: {
		type: String,
	},
	g_email: {
		type: String,
	},
	g_number: {
		type: String,
	},
	g_address: {
		type: String,
	},
	subject: {
		type: String,
	},
	emergencyContact: {
		type: String,
	},
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
