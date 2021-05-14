var isAuth = function (req, res, next) {
	if (req.isAuthenticated()) {
		next()
	} else {
		res.redirect('/')
	}
}

module.exports = isAuth
