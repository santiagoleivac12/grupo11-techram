const USER_ROL = "USER";

function rolUser(req, res, next){
    if(USER_ROL === 'USER_USER'){
        next()
    }else{
        /* res.redirect("/users/login") */
        res.redirect('/users/login')
        /* send('') */
    }
}
module.exports = rolUser;