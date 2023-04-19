const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const attendanceSchema = new mongoose.Schema({
	date: { type: Date },
	isPresent: {
		type: Boolean,
	},
});

const subjectSchema = new mongoose.Schema({
	title: { type: String, required: true },
	ca_marks: { type: Number, default: 0 },
	attendance: { type: [attendanceSchema] },
	teacherId: { type: String },
});

const userSchema = new mongoose.Schema({
	regNumber: {
		type: String,
	},
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
	amount: {
		type: String,
	},
	subjects: { type: [subjectSchema] },

	jwtToken: { type: String },
});

userSchema.methods.generateJWT = function () {
	const token = jwt.sign(
		{ _id: this._id, email: this.email },
		process.env.JWT_SECRET,
		{
			expiresIn: "30d",
		}
	);
	this.token = token;
	return this.save().then(() => token);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
