// COMO SUBIR O SERVIDOR
// Precisa de um express
// Possibilita tratar as exceções
// Onde se require o express, o express gerencia os verbos HTTP
// Verbos: GET, POST, PUT, PATCH e DELETE (CRUD)
// Importar o express
const express = require("express")
// importar o cors, colocar dentro de uma variável
const cors = require("cors")
const { application } = require("express")
// criar uma const chamada app, ela chama o express para que ele funcione
const app = express()
// body-parser, pelo app, utilizando o método use, chamando o express.json()
app.use(express.json())
// depois configurar acessando o método use pelo app, chamando o cors
app.use(cors())



// PARA QUE AS ROTAS FUNCIONEM
// importar as rotas criando uma constante
const pacientesRota = require("./routes/pacienteRoute")
//utilizar o método use para acessar a rota
app.use("/pacientes", pacientesRota)
// exportar o modulo app, no module.export
module.exports = app