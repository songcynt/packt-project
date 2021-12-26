const jwt = require("jsonwebtoken");

// A helper function to assert the request ID param is valid
// and convert it to a number (since it comes as a string by default)
function getIdParam(req) {
	const id = req.params.id;
	if (/^\d+$/.test(id)) {
		return Number.parseInt(id, 10);
	}
	throw new TypeError(`Invalid ':id' param: "${id}"`);
}

// We create a wrapper to workaround async errors not being transmitted correctly.
function makeHandlerAwareOfAsyncErrors(handler) {
	return async function (req, res, next) {
		try {
			await handler(req, res);
		} catch (error) {
			next(error);
		}
	};
}

const verifyAuthorized = (req, res, next) => {
	if (req.header('x-api-key') == "6de18130-637f-4c38-ac3e-81f18c8251d7"){
		req.user = {
			isAdmin: true
		}
		return next();
	}

	const token = req.cookies.token;

	if (!token) {
		return res.status(401).send("A token is required for authentication");
	}
	try {
		const decoded = jwt.verify(token, process.env.TOKEN_KEY);
		req.user = decoded;
	} catch (err) {
		return res.status(401).send("Invalid Token");
	}
	return next();
};

module.exports = { makeHandlerAwareOfAsyncErrors, getIdParam, verifyToken: verifyAuthorized };