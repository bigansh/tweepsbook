var isFetch = function (req, res, next) {
    var auth = { login: 'username', password: 'password' };
    var b64auth = (req.headers.authorization || '').split(' ')[1] || '';
    var [login, password] = Buffer.from(b64auth, 'base64').toString().split(':');
    if (login && password && login === auth.login && password === auth.password) {
        return next()
    }
    res.redirect('/dashboard');
}

module.exports = isFetch;