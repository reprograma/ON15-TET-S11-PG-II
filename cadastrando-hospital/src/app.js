// COMO SUBIR O SERVIDOR
// preciso do express, pq (?)
// possui um sistema de rotas
// possibilita tratar exceções
// gerencia o http que me possibilita usar os verbos
// verbos: GET, POST, PUT, PATCH E DELETE (CRUD)
// importar o express
const express = require("express")
// importar o cors, e colocar dentro de uma variavel
const cors = require("cors")
// criar uma constante chamada app, ela chama a funçao express, fazendo ele funcionar
const app = express()
// configurar API
// body-parser, pelo app, utilizando o metodo use, e vai chamar o express.json
app.use(express.json())
// depois configurar acessando o metodo use pelo app, chamando o cors
app.use(cors())

// COMO FAZER AS ROTAS FUNCIONAREM
// importar as rotas criando uma constante
const pacientesRota = require("./routes/pacienteRoutes")
// preciso utilizar o metodo use para acessar a rota
app.use("/pacientes", pacientesRota)


// exportar o modulo app
module.exports = app