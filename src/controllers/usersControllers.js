const controller = {
    login1: (req, res) =>{
        res.render('users/login')
    },
    perfil2: (req, res) =>{
        res.render('users/perfil')
    },
    register3: (req, res) =>{
        res.render('users/register')
    }
}

module.exports = controller