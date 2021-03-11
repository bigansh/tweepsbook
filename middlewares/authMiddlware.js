var isAuth = function (req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/dashboard/check');
    }
}

module.exports = isAuth;