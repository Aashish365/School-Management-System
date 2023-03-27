const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../models/user");

// user/createUser --->>> Route
router.post("/signUp", async (req, res) => {
	const { email, password } = req.body;
	bcrypt.hash(password, 10, async (err, hash) => {
		try {
			const emailExist = await User.findOne({ email: email }); // check in the database if email is already there or not.
			if (emailExist) {
				res.status(400).json({ error: "Email already exists" });
			} else {
				const newUser = new User({ email: email, password: hash });
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
