// COMO SUBIR O SERVIDOR
// Preciso do express, pq (?)
// Possui um sistema de rotas
// Possibilita tratar exceções
// Gerencia o http que me possibilita usar os verbos
// Verbos: GET, POST, PUT, PATCH e DELETE (CRUD)

// Importar o express
const express = require("express")
// Importar o cors, e colocar dentro de uma variável
const cors = require("cors")
// Criar uma constante chamada app, ela chama a função express, fazendo ela funcionar
const app = express()
// Configurar API
// Body-parser, pelo app, utilizando o método use, e vai chamar o método json
app.use(express.json())
// Depois configurar acessando o método use pelo app, chamando o cors
app.use(cors())

// COMO FAZER AS ROTAS FUNCIONAREM
// Importar as rotas criando uma constante
const pacientesRota = require("./routes/pacienteRoutes")
// Preciso utilizar o método use para acessar a rota
app.use("/pacientes", pacientesRota)

// Exportar o módulo app
module.exports = app