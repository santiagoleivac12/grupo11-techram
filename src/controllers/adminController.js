/* 
const path = require('path');
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json')
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const writeJson = dataBase => fs.writeFileSync(productsFilePath, JSON.stringify(dataBase), 'utf-8')
 */
const fs = require('fs');
const db = require('../database/models');

const Products = db.Product;
const ProductImages = db.ProductImage;
const Categories = db.Category;
const Subcategories = db.Subcategory;


let controller = {
    admin: (req,res) => {
        Products.findAll()
        .then(products => {
            res.render('administrador/admin',{
             products
       /*  session: req.session  */
            })

        })
    },
    //Muestra la vista para crear el producto
    create: (req,res) => {
        res.render('administrador/perfilAdminCrear');
    },
    store:(req,res)=>{
        Products.create({
            ...req.body
        })
        .then(product => {
            ProductImages.create({
                image: req.file ? req.file.filename : 'default-image.png',
                productId: product.id
            })
            .then(() => {
                res.redirect('/admin')
            }) 
        })
        .catch(error => console.log(error))       
    },
    /* -------------------------------------- */
    edit: (req, res) => {
        const productPromise = Products.findByPk(+req.params.id);
        const categoriesPromise = Categories.findAll();
        const subcategoriesPromise = Subcategories.findAll();
        Promise.all([productPromise, categoriesPromise, subcategoriesPromise])
        .then(([product, categories, subcategories]) => {
            res.render("administrador/editarProductoAdmin", {
                product
            })
        })
        .catch(error => console.log(error))
    }, 
    update: (req, res) => {
    const {name, price, category, description, discount, stock, type, specifications} = req.body;
    Products.update({
        name,
        price,
        category,
        description,
        discount,
        stock,
        type,
        specifications
    }, {
        where: {
            id:req.params.id
        }
    })
    .then((result) => {
        if(result){
            ProductImages.findAll({
                where:{
                    productId: req.params.id
                }
            })
            .then((images) =>{
                images.forEach((image) => {
                    fs.existsSync('./public/images/productos/', image.image)
                    ? fs.unlinkSync(`./public/images/productos/${image.image}`)
                    : console.log('No se encontro el archivo')
                })
                ProductImages.destroy({
                    where: {
                        productId: req.params.id
                    }
                })
                .then(() =>{
                    ProductImages.create({
                        where: {
                            image: req.file ? req.file.filename : 'default-image-png',
                            productId: req.params.id
                        }
                    })
                    .then(()=> res.redirect('/admin'))
                })
            })
        }
    })
    .catch(error => console.log(error))    
},
    destroy: (req, res) => {
        ProductImages.findAll({
            where: {
                productId: req.params.id
            }
        })
        .then((images) => {
            images.forEach((image) => {
                fs.existsSync('./public/images/productos/', image.image)
                ? fs.unlinkSync(`./public/images/productos/${image.image}`)
                : console.log('No se encontro el archivo')
            })
        })
        ProductImages.destroy({
            where: {
                productId: req.params.id
            }
        })
        .then((result) => {
            Products.destroy({
                where: {
                    id: req.params.id
                }
            })
            .then(res.redirect('/admin'))
            .catch(error => console.log(error))
        })
        .catch(error => console.log(error))
    }
}
module.exports = controller