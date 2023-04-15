const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router();
const xss = require("xss");
const User = require("../models/user");
const jwtValidator = require("../middlewares/jwtValidator");

// user/createUser --->>> Route

router.post("/", async (req, res, next) => {
	const { email, password } = req.body;

	if (!email) {
		return res.status(401).json({
			loggedIn: false,
			message: "empty email",
		});
	}
	if (!password) {
		return res.status(401).json({
			loggedIn: false,
			message: "empty Password Field",
		});
	}

	// Query the database to find the user with the matching email
	const user = await User.findOne({ email: xss(email) });
	if (!user) {
		return res
			.status(401)
			.json({ loggedIn: false, message: "Invalid email or password" });
	}

	// Compare the user's password with the hashed password in the database
	bcrypt.compare(password, user.password, async (err, result) => {
		if (err || !result) {
			return res
				.status(401)
				.json({ loggedIn: false, message: "Invalid email or password" });
		}

		// update the JWT Token after successful login  and store it in the database
		await user.generateJWT();
		// Send the JWT to the front-end
		res.status(200).json({
			loggedIn: true,
			message: "successful login",
			token: user.token,
		});
	});
});

router.post("/validateToken", jwtValidator);

module.exports = router;
