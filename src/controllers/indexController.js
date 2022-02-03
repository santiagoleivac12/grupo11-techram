/* const fs = require('fs');
const path = require('path')
 */

const db = require('../data/models');

const products = db.product; //para que busque todos los productos
const users = db.user;
const categories = db.category;
const subcategories = db.subcategy;
 /* const productsFilePath = path.join(__dirname, '../data/productsDataBase.json')
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8')); */

let controller = {
    index: (req, res) =>{
        users.findAll()
        .then((result) => {
            res.send(result)
        })


      /*   let productsInSale = products.filter(product => product.type === "oferta");// recorre el json y trae los productos en oferta
        let productsDestacados = products.filter(product => product.type === "producto destacado")// recorre el json y trae los productos nuevos
        res.render('products/index', {
            productsInSale,
            productsDestacados
        }); */
    }
}

module.exports = controller;