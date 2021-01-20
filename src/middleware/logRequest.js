module.exports = function (req, res, next) {
	console.log("Request", req.method, req.url);
	console.log(req.body);
	next();
};
