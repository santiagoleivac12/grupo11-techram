let controller = {
    crearArchivo: (req,res) => {
        res.render('administrador/perfilAdminCrear');
    },
    eliminarArchivo: (req,res) => {
        res.render('administrador/editarProductoAdmin');
    }
}

module.exports = controller;