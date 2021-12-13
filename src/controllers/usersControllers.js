const fs = require('fs');
const path = require('path')

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json')
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

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