module.exports = (req, res, next) => {
    if (req.session.user && req.session.user.rol == 1) {
        next()
    } else {
        res.redirect('/')
    }
}
