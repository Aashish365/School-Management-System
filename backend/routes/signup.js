const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../models/user");

// user/createUser --->>> Route
router.post("/", async (req, res) => {
	const { email } = req.body;
	try {
		const emailExist = await User.findOne({ email: email }); // check in the database if email is already there or not.
		if (emailExist) {
			res.status(401).json({
				msg: "Email already exists",
				moveForward: false,
			});
		} else {
			res.status(200).json({
				msg: "Email donot exist",
				moveForward: true,
			});
		}
	} catch (error) {
		res.status(500).json({ msg: "Internal server error" });
	}
});

router.post("/student", async (req, res) => {
	const {
		fName,
		lName,
		email,
		password,
		role,
		gender,
		phoneNumber,
		address,
		studentClass,
		section,
		guardianName,
		relation,
		g_email,
		g_number,
		g_address,
	} = req.body;

	console.log(req.body);
	bcrypt.hash(password, 10, async (err, hash) => {
		try {
			const newUser = new User({
				fName: fName,
				lName: lName,
				email: email,
				password: hash,
				role: role,
				gender: gender,
				phoneNumber: phoneNumber,
				address: address,
				studentClass: studentClass,
				section: section,
				guardianName: guardianName,
				relation: relation,
				g_email: g_email,
				g_number: g_number,
				g_address: g_address,
			});
			await newUser.save();
			res.json({ success: true });
		} catch (error) {
			console.log(error);
			res.status(500).json({ error: "Internal server error" });
		}
	});
});

router.post("/teacher", async (req, res) => {
	const {
		fName,
		lName,
		gender,
		email,
		password,
		role,
		phoneNumber,
		address,
		emergencyContact,
		subject,
	} = req.body;

	bcrypt.hash(password, 10, async (err, hash) => {
		try {
			const newUser = new User({
				email: email,
				password: hash,
				fName: fName,
				lName: lName,
				gender: gender,
				password: password,
				role: role,
				phoneNumber: phoneNumber,
				address: address,
				emergencyContact: emergencyContact,
				subject: subject,
			});
			await newUser.save();
			res.json({ success: true });
		} catch (error) {
			console.log(error);
			res.status(500).json({ error: "Internal server error" });
		}
	});
});

module.exports = router;
