const config = require('config');

module.exports = function (req, res, next) {
	if (!config.get('logRequest')) {
		next();
		return;
	}
	console.log("Request", req.method, req.url);
	console.log(req.body);
	next();
};
