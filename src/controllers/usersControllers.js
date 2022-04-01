const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs');
const db = require('../data/models')
/* const {check,validationResult,body} = require('express-validator'); */
/* const { Op } = require("sequelize"); */
const Users = db.User;
/* const Addresses = db.Address */


const controller = {
    login1: (req, res) => {
        res.render('users/login', {
            session: req.session
        })
    },
    processLogin: (req, res) => {
        let errors = validationResult(req);

        if (errors.isEmpty()) {
            Users.findOne({
                where: {
                    email: req.body.email
                }
            })
                .then(user => {
                    req.session.user = {
                        id: user.id,
                        firstName: user.firstName,
                        email: user.email,
                        avatar: user.avatar,
                        rol: user.rol
                    }

                    if (req.body.recordar) {
                        const TIME_IN_MILISECONDS = 6000000;
                        res.cookie("userTechram", req.session.user, {
                            expires: new Date(Date.now() + TIME_IN_MILISECONDS),
                            httpOnly: true,
                            secure: true
                        })
                    }

                    res.locals.user = req.session.user;

                    res.redirect('/')
                })

        } else {
            res.render('users/login', {
                errors: errors.mapped(),
                session: req.session
            })
        }

    },
    register3: (req, res) => {
        res.render('users/register', {
            session: req.session
        })
    },
    processRegister: (req, res) => {
        let errors = validationResult(req);
        if(errors.isEmpty()) {
            let { firstName, lastname, email, pass, phone} = req.body;
            Users.create({
                firstName,
                lastname,
                email,
                pass: bcrypt.hashSync(pass, 10),
                phone,
                avatar: req.file ? req.file.filename : "default-image.png",
                rol: 0
            })
            .then(() => {
                res.redirect('/users/login')
            })
        } else {
/*             errors = errors.mapped()
            if(req.fileValidationError) {
                errors = {
                    ...errors,
                    image : {
                        msg: req.fileValidationError
                    }
                }
            } */
            res.render('users/register', {
                errors,
                old: req.body,
                session: req.session
            })
        }
    },

    logout: (req, res) => {
        req.session.destroy();
        if (req.cookies.userTechram) {
            res.cookie('userTechram', "", { maxAge: -1 })
        }
        res.redirect('/')
    },
    perfil2: (req, res) => {
        Users.findByPk( req.session.user.id, {
            include: [{ association: 'addresses' }]
        })
            .then((user) => {
                res.render('users/perfil', {
                    user,
                    session: req.session
                }) 
            
            })
    },
    perfilEdit: (req,res) => {
        Users.findByPk( req.session.user.id, {
            include: [{ association: 'addresses' }]
        })
        .then((user) => {
            res.render('users/perfilEdit', {
                user,
                session: req.session
            })            
        })
    }
}

module.exports = controller

