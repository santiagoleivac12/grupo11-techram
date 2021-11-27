let express = require('express');
let app = express();
const PORT = 3000;
let path = require('path')

//middlewares
app.use(express.static('public'))

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


let indexRouter = require('./routes/indexRouter');
let detalleRouter = require('./routes/detalleRouter');
let carritoRouter = require('./routes/carritoRouter');

let login = require('./routes/loginRouter')
let register = require('./routes/registerRouter')
let perfil = require('./routes/perfilRouter')

// Routes
app.use('/', indexRouter);
app.use('/detalle', detalleRouter);
app.use('/carrito', carritoRouter);

app.use('/login',login);
app.use('/perfil',perfil);
app.use('/register',register)



//Server
app.listen(PORT, () => console.log(`
Servidor escuchando en el puerto ${PORT}
http://localhost:${PORT}
`))