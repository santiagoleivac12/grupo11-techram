const fs = require('fs');
const path = require('path')
const db =require("../data/models")
const Products= db.Products;
const Categories= db.Categories;
const Subcategories= db.Subcategories;

//const productsFilePath = path.join(__dirname, '../data/productsDataBase.json')
//const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


let controller = {
    detail: (req, res) => {
        Products.findOne({
            where: {
                id: req.params.id,
            },
            include: [{association: 'products_images'}]
        })
        .then(((product) => {
            Products.findAll({
                include: [{association: 'products_images'}],
                where: {
                    subcategoryId: product.subcategoryId
                }
            })
            .then((relatedProducts) => {
                res.render('productDetail', {
                    product,
                    sliderTitle: "Productos relacionados",
                    sliderProducts: relatedProducts,
                    session: req.session
                })
            })
        }))
    },
    category: (req, res) => {
        Categories.findOne({
            where: {
                id: req.params.id
            },
            include: [{
                association: 'subcategories',
                include: [{
                    association: 'products',
                    include: [{
                        association: 'productImages'
                    }]
                }]
            }]
        })
        .then((category) => {
            let subcategories = category.subcategories;
            let products = [];
            subcategories.forEach((subcategory) => {
                subcategory.products.forEach((product) => {
                    products.push(product);
                });
            });
            res.render('categories', {
                products,
                category,
                subcategories,
                session: req.session
            });
        })
        .catch(error => console.log(error))
    },
    subcategory: (req, res) => {
        Subcategories.findByPk(req.params.subcategory, {
            include: [{
                association: 'products',
                include: [{
                    association: 'productImages'
                }]
            }]
        })
        .then((subcategory) => {
            Categories.findByPk(req.params.categoryId, {
                include: [{association: 'subcategories'}]
            })
            .then((category) => {
                res.render('subcategory', {
                    products: subcategory.products,
                    category,
                    subcategories: category.subcategories,
                    session: req.session
                })
            })
        })
    },
    search: (req, res) => {
        Products.findAll({
            where: {
                name: {
                    [Op.substring]: req.query.keywords
                }
            },
            include: [{association: 'productImages'}]
        })
        .then((result) => {
            res.render('searchResult', {
                result,
                search: req.query.keywords,
                session: req.session
            })
        })
    }
}

module.exports = controller