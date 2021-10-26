let express = require('express');
let app = express();
const PORT = 3000;
let path = require('path')

//middlewares
app.use(express.static('public'))

// Routes
app.get('/', function (req, res){
    res.sendFile(path.join(__dirname, './views/index.html'))
})
app.get('/register', function (req, res){
    res.sendFile(path.join(__dirname, './views/register.html'))
})
app.get('/login', function (req, res){
    res.sendFile(path.join(__dirname, '/views/login.html'))
})

//Server
app.listen(PORT, () => console.log(`
Servidor escuchando en el puerto ${PORT}
http://localhost:${PORT}
`))