const fs = require('fs');
const path = require('path')

const productsFilePath = path.join(__dirname, '../data/products.json')
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const controller = {
    detail: (req, res) =>{
        let idProduct = req.params.id;
        let productDetail = products.find(product => product.id === +idProduct);
        res.render('products/detalleDeProducto', {
            productDetail
        })
    },
    carrito: (req, res) =>{
        res.render('products/carrito')
    }
}

module.exports = controller