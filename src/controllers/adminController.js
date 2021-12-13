const fs = require('fs');
const path = require('path');


const productsFilePath = path.join(__dirname, '../data/productsDataBase.json')
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const writeJson = dataBase => fs.writeFileSync(productsFilePath, JSON.stringify(dataBase), 'utf-8')

let controller = {
    admin: (req,res) => {
        res.render('administrador/admin',{
            products
        })
    },

    //Muestra la vista para crear el producto
    create: (req,res) => {
        res.render('administrador/perfilAdminCrear');
    },
    store:(req,res)=>{
        let lastId = 0;

        products.forEach(product => {
            if(lastId < product.id){
                lastId = product.id;
            }
        })

        let newProduct = {
            ...req.body,
            id:lastId + 1,
            image: req.file ? req.file.filename : "imagenqueserompa.png"  
        }

        products.push(newProduct);
        writeJson(products);
        res.redirect('/admin')

    },
    eliminarArchivo: (req,res) => {
        res.render('administrador/editarProductoAdmin');
    },
    /* -------------------------------------- */


    edit: (req, res) => {
        let productId = +req.params.id;

        let product = products.find(product => product.id = productId)
        res.render("administrador/editarProductoAdmin", {
            product,

        })
    },
    update: (req, res) => {
    let productId = +req.params.id;

    const {name, price, category, subcategory, description, discount} = req.body

    products.forEach(product => {
        if(product.id === productId){
            product.id = product.id,
            product.name = name.trim(),
            product.price = +price.trim(),
            product.category = +category,
            product.subcategory = subcategory,
            product.description = description.trim(),
            product.discount = +discount,
            product.image = req.file ? [req.file.filename] : product.image
        }
    })

    writeProductsJSON(products)

    res.redirect('products')
},

destroy: (req, res) => {
    let productId = +req.params.id;

    products.forEach(product => {
        if(product.id === productId){
            if(fs.existsSync("./public/images/productos/", product.image[0])){
                fs.unlinkSync(`./public/images/productos/${product.image[0]}`)
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

    writeProductsJSON(products)
    res.redirect('products')
}
  
}

module.exports = controller;