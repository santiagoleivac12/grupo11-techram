const fs = require('fs');
const path = require('path')

const db = require('../data/models');

const Products = db.Product;


let controller = {
    index: (req,res) => {
        Products.findAll({
            include: [{association: "productImages"}]
        })
        .then(products => {
            /* res.send(products) */
            res.render('products/index',{
            products,
            session: req.session  
            })

        })
    }
}

module.exports = controller;