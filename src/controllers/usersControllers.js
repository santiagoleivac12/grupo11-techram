const fs = require('fs');
const path = require('path')

const productsFilePath = path.join(__dirname, '../data/usersDataBase.json')
const users = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const writeUsersJSON = dataBase => fs.writeFileSync(productsFilePath, JSON.stringify(dataBase), "utf-8");

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