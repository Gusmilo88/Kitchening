const express = require('express');
const app = express();
const path = require('path');
const port = 3030;

app.use(express.static(path.join(__dirname,  'public' )))

app.get('/',(req,res) => res.sendFile(path.join(__dirname, 'views', 'home.html')))
app.get('/registrar',(req,res) => res.sendFile(path.join(__dirname, 'views', 'users','register.html')))
app.get('/ingresar',(req,res) => res.sendFile(path.join(__dirname, 'views', 'users','login.html')))




app.listen(port, () => console.log(`Servidor funcionando en http://localhost:${port}`))