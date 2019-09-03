const { sessionStore } = require('./session.js');


const middleware = {

    sessionChecker: function (req, res, next) {
        sessionStore.get(req.session.id).then((sesh) => {
            sesh ? res.redirect('/dashboard') : next();
        }).catch((err) => {
            next(err);
        })
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

    logHeaders: (req, res, next) => {
        console.log("-------- req.headers ---------")
        console.log(req.headers);
        console.log("------- end req.headers ------") 
        next();
    }

}



module.exports = middleware;