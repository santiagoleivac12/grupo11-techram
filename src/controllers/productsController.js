const controller = {
    detail: (req, res) =>{
        res.render('products/detalleDeProducto')
    },
    carrito: (req, res) =>{
        res.render('products/carrito')
    }
}

module.exports = controller