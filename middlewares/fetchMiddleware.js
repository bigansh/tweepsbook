var isFetch = function (req, res, next) {
	var auth = { login: 'TBrsfdf1rt', password: 'tbfrtpftb' }
	var b64auth = (req.headers.authorization || '').split(' ')[1] || ''
	var [login, password] = Buffer.from(b64auth, 'base64').toString().split(':')

	if (login && password && login === auth.login && password === auth.password) {
		next()
	} else {
		res.redirect('/dashboard')
	}
}

module.exports = isFetch
