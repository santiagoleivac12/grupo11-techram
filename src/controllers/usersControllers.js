///const { users,writeUsersJSON } = require('../data/dataBase')
const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs');
const db= require('../data/models')

const Users=db.User;

const controller = {
    login1: (req, res) =>{
        res.render('users/login', {
            session: req.session
        })
    },
    processLogin: (req, res) =>{
        let errors= validationResult(req);

        if(errors.isEmpty()) {
           Users.findOne({
               where:{
                    email: req.body.email
               }
           })
           .then(user=>{
            req.session.user={
                id: user.id,
                firstName: user.firstName,
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
 
            res.locals.user = req.session.user;
 
            res.redirect('/')
           })
          
        }else{
            res.render('users/login',{
                errors: errors.mapped(),
                session: req.session,
                old: req.body
            })
        }
        
    },
    register3: (req, res) =>{
        res.render('users/register', {
            session: req.session
        })
    },
    processRegister: (req,res) =>{
        let errors = validationResult(req);
        if(errors.isEmpty()){
            let{firstName,lastname,email,pass}= req.body;
            Users.create({
                firstName,
                lastname,
                email,
                pass: bcrypt.hashSync(pass1, 10),
                avatar: req.file ? req.file.filename:"default-image.png",
                rol: 0
            })
            .then(()=>{
                res.redirect('/users/login')
            })
            if(errors.isEmpty()){
                let lastId = 1;
    
                users.forEach(user => {
                if(user.id > lastId){
                    lastId = user.id;
                }
            })
    
            }else{
                res.render('users/register', {
                    errors: errors.mapped(),
                    session: req.session 
                })
        }
       
        }
    },

    logout: (req,res) =>{
        req.session.destroy();
        if(req.cookies.userTechram){
            res.cookie('userTechram', "", { maxAge: -1})
        }

        res.redirect('products/index')
    },
    perfil2: (req, res) =>{
        res.render('users/perfil')
    }
}

module.exports = controller

