const fs = require('fs');
const db = require('../data/models');

const Products = db.Product;
const ProductImages = db.ProductImage;
const Categories = db.Category;
const Subcategories = db.Subcategory;


let controller = {
    admin: (req,res) => {
        Products.findAll({
            include: [{association: "productImages"}]
        })
        .then(products => {
            res.render('administrador/admin',{
            products,
            session: req.session  
            })

        })
    },
    //Muestra la vista para crear el producto
    create: (req,res) => {
        res.render('administrador/perfilAdminCrear');
    },
    store:(req,res)=>{
        Products.create({
            ...req.body,
            specificationsId: 5,
            subcategoryId: 3,
            stock: 5
        })
        .then(product => {
            ProductImages.create({
                image: req.file ? [req.file.filename] : ['default-image.png'],
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
        const productPromise = Products.findByPk(req.params.id);
        const categoriesPromise = Categories.findAll();
        const subcategoriesPromise = Subcategories.findAll();
       /*  const specificationsPromise = Specifications.findAll(); */
        Promise.all([productPromise, categoriesPromise, subcategoriesPromise/* , specificationsPromise */])
        .then(([product, categories, subcategories/* , specifications */]) => {
            /* res.send(product, categories, subcategories) */
            res.render("administrador/editarProductoAdmin", {
                product,
                categories,
                subcategories
            })
        })
        .catch(error => console.log(error))
    }, 
    update: (req, res) => {
        /* console.log(req.body) */
    const {name, specifications, price, discount, subcategory} = req.body;
    Products.update({
        name,
        specificationsId: specifications,
        price,
        discount,
        subcategoryId: subcategory,
        stock
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
                    fs.existsSync('./public/images/productos', image.image)
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