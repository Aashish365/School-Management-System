const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const xss = require("xss");
const User = require("../models/user");

// user/createUser --->>> Route
router.post("/", async (req, res) => {
	const { name, email, password, phoneNumber, address, gender, role } =
		req.body;

	bcrypt.hash(password, 10, async (err, hash) => {
		try {
			const emailExist = await User.findOne({ email: xss(email) }); // check in the database if email is already there or not.
			if (emailExist) {
				res.status(400).json({ error: "Email already exists" });
			} else {
				const newUser = new User({
					email: xss(email),
					password: hash,
					phoneNumber: xss(phoneNumber),
					address: xss(address),
					gender: xss(gender),
					role: xss(role),
				});

				await newUser.save();
				res.json({ success: true });
			}
		} catch (error) {
			console.log(error);
			res.status(500).json({ error: "Internal server error" });
		}
	});
});
module.exports = router;
