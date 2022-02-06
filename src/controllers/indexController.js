const fs = require('fs');
const path = require('path')

const db = require('../data/models');

const Products = db.Product;
const ProductImages = db.ProductImage;


let controller = {
    index: (req,res) => {
        Products.findAll({
            include: [{association: "productImages"}]
        })
        .then(products => {
            res.render('products/index',{
            products,
            session: req.session  
            })

        })
    }
}

module.exports = controller;