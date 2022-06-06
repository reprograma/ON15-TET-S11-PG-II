//como subir o servidor
// preciso do express, porque?
//possui um sistema de rotas
//possibilita tratar exceções
//verbos : GET, POST, PUT, PATCH E DELETE(CRUD)
//importar o express
//criar uma constante chamada app, ela chama a função express
// configurar o API
//body parser pelo app com o metodo use e vai chamar o express json
//importar o cors colocar ele dentro de uma variavel e tambem chamar o cors atraves do metodo use
//exportar o modulo app

const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())


//como fazerem as rotas funcionarem 
//Importar as rotas criando uma constante
//preciso utilizar o metodo use para acessar a rota
const pacientesRota = require("./routes/pacienteRoutes")
app.use("/pacientes", pacientesRota)



module.exports = app