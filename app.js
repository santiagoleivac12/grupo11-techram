let express = require('express');
let app = express();
const PORT = 3000;
let path = require('path')

//middlewares
app.use(express.static('public'))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const indexRouter = require('./src/routes/indexRouter')

// Routes
app.use('/', indexRouter)

app.get('/register', function (req, res){
    res.sendFile(path.join(__dirname, './views/register.ejs'))
})
app.get('/login', function (req, res){
    res.sendFile(path.join(__dirname, './views/login.ejs'))
})
app.get('/perfil', function (req, res){
    res.sendFile(path.join(__dirname, './views/perfil.ejs'))
})
app.get('/detalle', function (req, res){
    res.sendFile(path.join(__dirname, './views/detalleDeProducto.ejs'))
})
app.get('/carrito', function (req, res){
    res.sendFile(path.join(__dirname, './views/carrito.ejs'))
})

//Server
app.listen(PORT, () => console.log(`
Servidor escuchando en el puerto ${PORT}
http://localhost:${PORT}
`))