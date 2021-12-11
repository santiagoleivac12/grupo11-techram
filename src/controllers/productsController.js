const fs = require('fs');
const path = require('path')

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json')
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const controller = {
    detail: (req, res) =>{
        let idProduct = +req.params.id;
        let product = products.find(product => product.id === idProduct);
        res.render('products/detalleDeProducto', {
            product
        })
    },
    carrito: (req, res) =>{
        res.render('products/carrito')
    }
}

module.exports = controller