const cookieSession = (req,res, next) => {
    if(req.cookies.userTechram){ //preguntamos si existe la cookie
        req.session.user = req.cookies.userTechram; 
        res.locals.user = req.session.user; //si existe levantamos sesion
    }else {
        next()
    }
}

module.exports = cookieSession;