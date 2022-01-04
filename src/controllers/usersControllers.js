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
    },
    processRegister: (req,res) =>{
        let error = validationResult(req);

        if(errors.isEmpty()){
            let lastId = 1;

            users.forEach(user => {
            if(lastId < user.id){
                lastId = user.id;
            }
        })

        let newUser = {
            ...req.body,
            id:lastId + 1,
            password: bcrypt.hashSync(password, 10),//pedirle a mica que ponga los names o preguntarle si lo puedo hacer yo
            image: req.file ? req.file.filename : "imagenqueserompa.png"  
        }

        users.push(newUser);
        writeUsersJSON(users);
        res.redirect('/users/login')
        }else{
            res.render('register', {
                errors: errors.mapped(),
                session: req.session
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