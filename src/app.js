let express = require('express');
let app = express();
const PORT = 3000;
let path = require('path')

//middlewares
app.use(express.static('public'))

//Para capturar la información de los formularios
app.use(express.urlencoded({extended: false}));
app.use(express.json())

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


const indexRouter = require('./routes/index');
const productsRouter = require('./routes/products');
const adminRouter = require('./routes/admin');
const usersRouter = require('./routes/users')



// Routes
app.use('/', indexRouter);
app.use('/products', productsRouter);
app.use('/admin', adminRouter);
app.use('/users', usersRouter);



//Server
app.listen(PORT, () => console.log(`
Servidor escuchando en el puerto ${PORT}
http://localhost:${PORT}
`))