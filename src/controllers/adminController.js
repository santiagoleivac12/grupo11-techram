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
    }
}

module.exports = controller;