const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
	const token = req.cookies.token;

	if (!token) {
		return res.status(401).send("Unauthorized: No token provided");
	}

	try {
		const decoded = jwt.verify(token, "secret");
		req.user = decoded;
		next();
	} catch (err) {
		return res.status(401).send("Unauthorized: Invalid token");
	}
}
module.exports = verifyToken;
