const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const jwt = require("jsonwebtoken");
const xss = require("xss");
const User = require("../models/user");

// user/createUser --->>> Route
router.post("/", async (req, res) => {
	const { email, password } = req.body;

	// Query the database to find the user with the matching email
	const user = await User.findOne({ email: xss(email) });
	if (!user) {
		return res.status(401).json({ message: "Invalid email or password" });
	}

	// Compare the user's password with the hashed password in the database
	bcrypt.compare(password, user.password, async (err, result) => {
		if (err || !result) {
			return res.status(401).json({ message: "Invalid email or password" });
		}

		// update the JWT Token after successful login  and store it in the database
		await user.generateJWT();

		// Send the JWT to the front-end
		const token = user.token;
		res
			.status(200)
			.json({
				name: user.name,
				email: user.email,
				loggedIn: "true",
				message: "successful login",
				token: token,
			});
	});
});
module.exports = router;
