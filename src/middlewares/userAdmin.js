

/* function userAdminCheck(req, res, next){
    if(req.session.user && req.session.user.rol === "USER_ADMIN"){
        next()
    }else{
        res.redirect("/users/login")
    }
}

module.export = userAdminCheck */

const USER_ROL = "USER_ADMIN";

function userAdmin(req, res, next){
    if(USER_ROL === 'USER_ADMIN'){
        next()
    }else{
        res.redirect("/users/login")
        /* send('') */
    }
}
module.exports = userAdmin