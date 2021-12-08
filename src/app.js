let express = require('express');
let app = express();
const PORT = 3000;
let path = require('path')

//middlewares
app.use(express.static('public'))

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


let indexRouter = require('./routes/index');
let productsRouter = require('./routes/products');
let adminRouter = require('./routes/admin');
let usersRouter = require('./routes/users')



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