module.exports = {
    
    sessionChecker: function (req, res, next) {
        try {
            if (req.session.user && req.cookies.user_sid) {
                res.redirect('/dashboard');
            } else {
                next();
            }
        } catch (err) {
            next();
        }
    },

    cookieChecker: function (req, res, next) {
        try { 
            if (req.cookies.user_sid && !req.session.user) {
                res.clearCookie('user_sid');
            }
            next();
        } catch (err) {
            next();
        }
    },

    routeNotFound: function (req, res, next) {
        res.status(404).send("Sorry can't find that!")
    },

}
