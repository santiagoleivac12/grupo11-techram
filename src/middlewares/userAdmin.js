const session = require('express-session');

function userAdmin(req, res, next){
    if (req.session.user && req.session.user.rol == "USER_ADMIN") {
        next()
    } else {
        res.redirect('/')
    }
}
module.exports = userAdmin