let express = require('express');
let app = express();
const PORT = 3000;
let path = require('path');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser')
const cookieSession = require('./middlewares/cookieSession')
const session= require('express-session')


//middlewares
app.use(methodOverride('_method')); 
app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));//Para capturar la información de los formularios
app.use(express.json())
app.use(cookieParser())
app.use(cookieSession)
app.use(session({
    secret:'techram',
    resave: false,
    saveUninitialized: true,
    cookie: {secure:true}
}))

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