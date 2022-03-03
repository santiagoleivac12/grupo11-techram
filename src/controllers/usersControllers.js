///const { users,writeUsersJSON } = require('../data/dataBase')
//const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs');
const db = require('../data/models')
const {check,validationResult,body} = require('express-validator');
const { Op } = require("sequelize");
const Users = db.User;
const Addresses = db.Address


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
                        const TIME_IN_MILISECONDS = 600000;
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
                session: req.session,
                old: req.body
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
        if (errors.isEmpty()) {
            let { firstName, lastname, email, pass} = req.body;
            db.Users.create({
                firstName: firstName.trim(),
                lastname: lastname.trim(),
                email,
                pass: bcrypt.hashSync(pass1, 10),
                phone: 55555555,
                avatar: req.file ? req.file.filename : "default-image.png",
                rol: 0
            })
                .then((user) => {
                    req.session.user={
                        id: user.id,
                        name: user.firstName,
                        lastname: user.lastname,
                        email: user.email,
                        avatar: user.avatar,
                        rol: user.rol,
                        Address: user.address,
                        phone: user.phone,


                    }
                    res.redirect('/users/login')
                })
        } else {
            res.render('users/register', {
                errors: errors.mapped(),
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
    }


}

module.exports = controller

