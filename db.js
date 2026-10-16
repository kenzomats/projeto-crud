//credenciais de acesso
//ip host: localhost (127.0.0.1)
//usuario: root
//senha: catolica
// banco de dados: userdb 
// porta: 3307

const mysql = require('mysql2')

//criar a instancia de conexao
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'catolica',
    database: 'userdb',
    port: '3307'
})

//estabelecer conexao
db.connect(err =>{
    if (err) throw err;
    console.log('Conectado ao banco de dados')
})

//exportar o modulo
module.exports = db;