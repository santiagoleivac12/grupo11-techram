const fs = require('fs');
const db = require('../data/models');
let { validationResult } = require('express-validator')

const Products = db.Product;
const ProductImages = db.ProductImage;
const Categories = db.Category;
const Subcategories = db.Subcategory;
const Order_items = db.Order_item;


let controller = {
    admin: (req,res) => {
/*         Products.findAll({
            include: [{association: "productImages"}]
        }) */
        let url = `http://${req.headers.host}${req.originalUrl}`;

        const getPageData = (data, page, limit) => {
            const { count, rows: result} = data;
            const pages = Math.ceil( count/limit)
            const currentPage = page ? + page : 0;
            let next_page = "";
            let previous_page = "";

            if(url.includes('page')){

                let page_params = url.substring(url.search(/page/i), url.search(/&/i))

                if (currentPage == 0) {
                    next_page = url.replace(page_params, `page=${currentPage + 1}`)
                } else {
                    previous_page = url.replace(page_params, `page=${currentPage - 1}`)
                    next_page = url.replace(page_params, `page=${currentPage + 1}`)
                }

            }else{
                next_page = `${url}?page=${currentPage + 1}&size=${limit}`;
            }

            const next = page == (pages -1)? null : next_page;
            const previous = currentPage == 0? null : previous_page;

            return { count, pages, currentPage, previous, next, result}

        }

        const {page, size} = req.query;

        const getPagination = (page , size) => {

            const limit = size ? +size : 10;
            const offset = page ? page * limit : 0;
            return{ limit, offset}
        }

        const {limit, offset} = getPagination(page, size)

        Products.findAndCountAll({
            limit: limit,
            offset: offset
        })
        .then(response => {
            const data = getPageData(response, page, limit)
            res.render('administrador/admin',{
                products: data.result,
                session: req.session,
                count: data.count,
                pages: data.pages,
                currentPage: data.currentPage,
                previous: data.previous,
                next: data.next
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
        let errors = validationResult(req)
        let arrayImages = [];
        if(req.files){
            req.files.forEach((image) => {
                arrayImages.push(image.filename)
            })
        }
        if(errors.isEmpty()){
            const {name, price, category, subcategory, description, discount, stock} = req.body
            Products.create({
                name, 
                price, 
                discount,
                stock,
                description,
                subcategoryId: subcategory,
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
            .catch(error => console.log(error))
        }else{
            errors = errors.mapped()
            if(req.fileValidationError) {
                errors = {
                    ...errors,
                    image : {
                        msg: req.fileValidationError
                    }
                }
            }
            let allCategories = Categories.findAll();
            let allSubcategories = Subcategories.findAll();
            Promise.all([allCategories, allSubcategories])
            .then(([categories, subcategories]) => {
            res.render('administrador/perfilAdminCrear', {
                categories,
                subcategories,
                errors,
                old: req.body,
                session: req.session
                })
            })
            .catch(error => console.log(error))
        }      
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
        Promise.all([productPromise, categoriesPromise, subcategoriesPromise])
        .then(([product, categories, subcategories]) => {
            res.render("administrador/editarProductoAdmin", {
                product,
                categories,
                subcategories,
                session:req.session
            })
        })
        .catch(error => console.log(error))
    }, 
    update: (req, res) => {
        let errors = validationResult(req)
        if(errors.isEmpty()){
            const {name, price, category, subcategory, description, discount, stock, marca} = req.body
            Products.update({
                name, 
                price, 
                discount,
                stock,
                description,
                marca,
                subcategoryId: subcategory,
            }, {
                where: {
                    id:req.params.id
                }
            })
            .then((result) => {
                if(req.files.length > 0){
                    let arrayImages = [];
                    if(req.files){
                        req.files.forEach((image) => {
                            arrayImages.push(image.filename)
                        })
                    }
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
                            let images = arrayImages.map((image) => {
                                return {
                                    image: image,
                                    productId: req.params.id
                                }
                            });
                            ProductImages.bulkCreate(images)
                            .then(() => res.redirect('/admin'))
                            .catch(error => console.log(error))
/*                             ProductImages.create({
                                image: req.file ? req.file.filename : 'default-image.png',
                                productId: req.params.id
                            }) */
/*                             .then(()=> {
                                res.redirect('/admin')
                            }) */
                        })
                    })
                .catch(error => console.log(error))
                }else {
                    res.redirect('/admin')
                }
 
            })
            
        }else{
            errors = errors.mapped()
            if(req.fileValidationError) {
                errors = {
                    ...errors,
                    image : {
                        msg: req.fileValidationError
                    }
                }
            }
            let productId = Number(req.params.id);
            const categoriesPromise = Categories.findAll();
            const subcategoriesPromise = Subcategories.findAll();
            Promise.all([productPromise, categoriesPromise, subcategoriesPromise])
            .then(([product, categories, subcategories]) => {
                res.render("administrador/editarProductoAdmin", {
                    product,
                    categories,
                    subcategories,
                    session:req.session
                })
            })
            .catch(error => console.log(error)) 
        }  
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
            Order_items.destroy({
                where: {
                    productId: req.params.id
                }
            })
            .then(()=>{
                Products.destroy({
                    where: {
                        id: req.params.id
                    }
                })
                .then(res.redirect('/admin'))
                .catch(error => console.log(error))
            })
        })
        .catch(error => console.log(error))
    }
}
module.exports = controller