const jwt = require("jsonwebtoken");
const user = require("../models/user");

const verifyToken = (req, res, next) => {
	if (req.body.cookie === "") {
		return res.json({
			loggedIn: false,
			message: "empty Token",
		});
	}
	jwt.verify(req.body.cookie, process.env.JWT_SECRET, (err, decoded) => {
		if (err) {
			return res.json({
				loggedIn: false,
				message: "Invalid Token",
			});
		} else {
			return res.status(200).json({
				loggedIn: true,
				message: "successful login",
				token: user.token,
			});
		}
	});
};
module.exports = verifyToken;
