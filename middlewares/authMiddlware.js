var isAuth = (req, res, next) => {
    if(req.isAuthenticated()){
        next();
    } else {
        res.redirect('/check');
    }
}

module.exports = isAuth;