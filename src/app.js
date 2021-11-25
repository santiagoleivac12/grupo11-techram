let express = require('express');
let app = express();
const PORT = 3000;
let path = require('path')

//middlewares
app.use(express.static('public'))

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


let indexRouter = require('./routes/indexRouter')
let detalleRouter = require('./routes/detalleRouter')
let carritoRouter = require('./routes/carritoRouter')
// Routes
app.use('/', indexRouter)
app.use('/detalle', detalleRouter)
app.use('/carrito', carritoRouter)


app.get('/register', function (req, res){
    res.sendFile(path.join(__dirname, './views/register.ejs'))
})
app.get('/login', function (req, res){
    res.sendFile(path.join(__dirname, './views/login.ejs'))
})
app.get('/perfil', function (req, res){
    res.sendFile(path.join(__dirname, './views/perfil.ejs'))
})

//Server
app.listen(PORT, () => console.log(`
Servidor escuchando en el puerto ${PORT}
http://localhost:${PORT}
`))