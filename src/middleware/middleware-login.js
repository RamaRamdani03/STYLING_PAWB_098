function isLoggedIn(req, res, next) {
    if (req.session.idUser) {
        return next();
    }
    res.redirect('/SignIn');
}

module.exports = { isLoggedIn };