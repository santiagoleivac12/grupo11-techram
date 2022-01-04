const fs = require('fs');
const path = require('path')

const productsFilePath = path.join(__dirname, '../data/usersDataBase.json')
const users = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const writeUsersJSON = dataBase => fs.writeFileSync(productsFilePath, JSON.stringify(dataBase), "utf-8");
const{validationsResults}= require('express-validator')

const controller = {
    login1: (req, res) =>{
        res.render('users/login')
    },
    processLogin: (req, res) =>{
        let errors= validationsResults(req);

        if(errors.isEmpty()) {
           let user= users.find(user=>user.email)
           req.session.user={
               id: user.id,
               name: user.name,
               email: user.email,
               avatar: user.avatar,
               rol: user.rol
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
    }
}

module.exports = controller