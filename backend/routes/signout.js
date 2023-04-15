const express = require("express");
const router = express.Router();

router.post("/", async (req, res, next) => {
	return res.status(401).json({
		loggedIn: false,
		message: "Successfully Logged out",
	});
});
module.exports = router;
