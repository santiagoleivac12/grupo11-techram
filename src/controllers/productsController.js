const fs = require('fs');
const path = require('path')
const db =require("../data/models")
const Products= db.Products;
const Categories= db.Categories;
const Subcategories= db.Subcategories;

//const productsFilePath = path.join(__dirname, '../data/productsDataBase.json')
//const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


const controller = {
    detail:(req,res)=>{
       Products.findOne({
           where:{
              id: req.params.id, 
           },
           include:[{association:"productImages"}]
       })
        .then((product=>{
            Products.findAll({
                where:{
                    subcategoryId: product.subcategoryId
                }
            })
        }))
    }
   /* detail: (req, res) =>{
        let idProduct = +req.params.id;
        let product = products.find(product => product.id === idProduct);
        res.render('products/detalleDeProducto', {
            product
        })
    },
    carrito: (req, res) =>{
        res.render('products/carrito')
    }*/
}

module.exports = controller