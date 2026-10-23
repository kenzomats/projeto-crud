// logica de negocio do backend
// cadastrar os usuários
const express = require('express')
const router = express.Router() // modularizar as rotas
const db = require('../db') // traz conexao com banco de dados

//CRUD - rotas
// rota - cadastrar usuario
router.post('/cadastrar', (req, res)=>{
    //capturar os dados enviados pelo formulário
    const {nome, email} = req.body
    
    //instrucao SQL
    db.query('INSERT INTO users (nome, email) VALUES (?, ?)', [nome, email], 
        (err, result) =>{ //tratamento de exceçao
            if (err) return res.status(500).send(err);
            res.status(201).json({id:result.insertId, nome, email});
        }
    )
})

//rota - listar usuarios
router.get('/listar',(req, res)=>{
    db.query('SELECT * FROM users', (err, results) =>{
        if(err) res.status(500).send(err)
        res.json(results)
    })
})

module.exports = router; //exportar o modulo api de usuarios