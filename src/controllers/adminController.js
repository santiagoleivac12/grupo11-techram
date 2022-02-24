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
        let allCategories = Categories.findAll();
        let allSubcategories = Subcategories.findAll();
        Promise.all([allCategories, allSubcategories])
        .then(([categories, subcategories]) => {
            res.render('administrador/perfilAdminCrear', {
                categories,
                subcategories,
                session: req.session
            })
        })
    },
    store:(req,res)=>{
        let arrayImages = [];
        if(req.files){
            req.files.forEach((image) => {
                arrayImages.push(image.filename)
            })
        }

        Products.create({
            ...req.body,
            specificationsId: 5,
            subcategoryId: subcategory
        })
        .then((product) => {
            if(arrayImages.length > 0){
                let images = arrayImages.map((image) => {
                    return {
                        image: image,
                        productId: product.id
                    }
                });
                ProductImages.bulkCreate(images)
                .then(() => res.redirect('/admin'))
                .catch(error => console.log(error))
            }else {
                ProductImages.create({
                    image: 'default-image.png',
                    productId: product.id
                })
                .then(() => {res.redirect('/admin')})
                .catch(error => console.log(error))
            }
        })
/*         .then(product => {
            ProductImages.create({
                image: req.file ? [req.file.filename] : ['default-image.png'],
                productId: product.id
            })
            .then(() => {
                res.redirect('/admin')
            }) 
        }) */
        .catch(error => console.log(error))       
    },
    /* -------------------------------------- */
    edit: (req, res) => {
        const productPromise = Products.findOne({
            where: {
                id: req.params.id,
            },
            include: [{association: 'productImages'}]
        });
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
        res.send(req.body)
    const {name, specifications, price, discount, subcategory, stock} = req.body;
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
                            image: req.file ? req.file.filename : 'default-image.png',
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
                fs.existsSync('../public/images/productos/', image.image)
                ? fs.unlinkSync(`../public/images/productos/${image.image}`)
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