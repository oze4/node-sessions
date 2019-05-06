module.exports = {


    // middleware function to check for logged-in users
    sessionChecker: function (req, res, next) {
        console.log("\r\n\r\nSESSION_CHECKER\r\n");
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

    // This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
    // This usually happens when you stop your express server after login, your cookie still remains saved in the browser.
    cookieChecker: function (req, res, next) {
        console.log("\r\n\r\nCHECKED COOKIE!\r\n\r\n")
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
    }


}