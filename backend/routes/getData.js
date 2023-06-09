const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const jwtValidator = require("../middlewares/jwtValidator");

router.post("/", async (req, res, next) => {
	const { cookie } = req.body;
	// Query the database to find the user with the matching email
	cookieInfo = jwt.verify(cookie, process.env.JWT_SECRET);
	const user = await User.findOne({ email: cookieInfo.email });
	if (!user) {
		return res.status(401).json({ message: "No data found" });
	}
	return res.status(200).json({
		success: true,
		data: user,
	});
});

router.post("/byclass", async (req, res, next) => {
	const { cookie, studentClass } = req.body;
	// Query the database to find the user with the matching email
	cookieInfo = jwt.verify(cookie, process.env.JWT_SECRET);
	const user = await User.findOne({ email: cookieInfo.email });
	const students = await User.find({
		role: "student",
		studentClass: studentClass,
	});

	if (!user) {
		return res.status(401).json({ message: "No data found" });
	}
	return res.status(200).json({
		success: true,
		data: students,
	});
});
router.post("/validateToken", jwtValidator);
module.exports = router;
