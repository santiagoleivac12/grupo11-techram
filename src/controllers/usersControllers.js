const { users,writeUsersJSON } = require('../data/dataBase')
const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs');

const controller = {
    login1: (req, res) =>{
        res.render('users/login')
    },
    processLogin: (req, res) =>{
        let errors= validationResult(req);

        if(errors.isEmpty()) {
           let user= users.find(user=>user.email)
           req.session.user={
               id: user.id,
               name: user.name,
               email: user.email,
               avatar: user.avatar,
               rol: user.rol
           }

           if(req.body.recordar){
            const TIME_IN_MILISECONDS = 60000;
            res.cookie("userTechram", req.session.user, {
                expires: new Date(Date.now() + TIME_IN_MILISECONDS),
                httpOnly: true, 
                secure: true
            })
        }

           res.locals.user= req.session.user;

           res.redirect('/')
        }else{
            res.render('login',{
                validationErrors: errors.mapped()
            })
        }
        
    },
    perfil2: (req, res) =>{
        res.render('users/perfil')
    },
    register3: (req, res) =>{
        res.render('users/register')
    },
    processRegister: (req,res) =>{
        let errors = validationResult(req);

        if(errors.isEmpty()){
            let lastId = 1;

            users.forEach(user => {
            if(user.id > lastId){
                lastId = user.id;
            }
        })

        let { firstName, lastName, email, password } = req.body

        let newUser = {
            id: lastId + 1,
            firstName,
            lastName,
            email, 
            password: bcrypt.hashSync(password, 10),
            image: req.file ? req.file.filename : "default-image.png"
        }

        users.push(newUser);
        writeUsersJSON(users);
        res.redirect('/users/login')
        }else{
            res.render('/users/register', {
                errors: errors.mapped()/* ,
                session: req.session */
            })
        }
    },
    logout: (req,res) =>{
        req.session.destroy();
        if(req.cookies.userTechram){
            res.cookie('userTechram', "", { maxAge: -1})
        }

        res.redirect('products/index')
    }
}

module.exports = controller