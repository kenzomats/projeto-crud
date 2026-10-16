const express= require('express');
const app = express();

//estabelecer os arquivos estáticos
const path = require('path'); // construcao do caminho
// pasta dos arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')))

//criar conextao de teste
const db = require('./db');

const port = 3000; // porta do server web
//rota padrao
app.get('/', (req, res) => {
    //res.send("Front funcionando.")
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
});

app.listen(port, ()=>{
    console.log("Servidor funcionando")
});