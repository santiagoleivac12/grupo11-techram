/* 
const path = require('path');
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json')
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const writeJson = dataBase => fs.writeFileSync(productsFilePath, JSON.stringify(dataBase), 'utf-8')
 */
const fs = require('fs');
const db = require('../data/models');

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
        const productPromise = Products.findByPk(req.params.id);
        const categoriesPromise = Categories.findAll();
        const subcategoriesPromise = Subcategories.findAll();
        Promise.all([productPromise, categoriesPromise, subcategoriesPromise])
        .then(([product, categories, subcategories]) => {
            res.render("administrador/editarProductoAdmin", {
                product
            })
        })
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

                })
            })
        }
    })  
    /* writeJson(products); */
    res.redirect('/admin')
},
destroy: (req, res) => {
    let productId = +req.params.id;
    products.forEach(product => {
        if(product.id === productId){
            if(fs.existsSync("./public/images/productos/", product.image)){
                fs.unlinkSync(`./public/images/productos/${product.image}`)
            }else{
                console.log('No encontré el archivo')
            }
            let productToDestroyIndex = products.indexOf(product) // si lo encuentra devuelve el indice si no -1
            if(productToDestroyIndex !== -1) {
                products.splice(productToDestroyIndex, 1)
            }else{  // primer parámetro es el indice del elemento a borrar, el segundo, la cantidad a eliminar
                console.log('No encontré el producto')
            }
        }
    })
    writeJson(products)
    res.redirect('/admin')
}
}
module.exports = controller