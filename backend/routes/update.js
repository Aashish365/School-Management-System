const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router();
const xss = require("xss");
const User = require("../models/user");
const jwtValidator = require("../middlewares/jwtValidator");

// user/createUser --->>> Route

function getCurrentDateString() {
	const today = new Date();
	const year = today.getFullYear();
	const month = (today.getMonth() + 1).toString().padStart(2, "0");
	const day = today.getDate().toString().padStart(2, "0");
	return `${year}-${month}-${day}`;
}

router.post("/markAttendance", async (req, res, next) => {
	const { cookie, presentStudents } = req.body;

	cookieInfo = jwt.verify(cookie, process.env.JWT_SECRET);
	const user = await User.findOne({ role: "faculty", email: cookieInfo.email });

	presentStudents.map(async (regNumber) => {
		const title = user.subject;
		const student = await User.findOne({ regNumber: regNumber });
		let subject = student.subjects.find((sub) => sub.title === title);
		if (!subject) {
			const attendance = {
				isPresent: true,
			};
			subject = {
				title: title,
				ca_marks: 0,
				attendance: [attendance],
				teacherId: user.regNumber,
			};
			student.subjects.push(subject);
		} else {
			const attendance = {
				date: getCurrentDateString(),
				isPresent: true,
			};
			if (
				!subject.attendance.find((el) => el.date === getCurrentDateString())
			) {
				subject.attendance.push(attendance);
			}
		}
		await student.save();
	});

	return res.status(200).json({
		success: true,
	});
});

router.post("/validateToken", jwtValidator);

module.exports = router;
