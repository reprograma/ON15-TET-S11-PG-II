// Subindo o Servidor

const express = require("express")
const cors = require("cors")

const app = express()

// Configuração da API

app.use(express.json())
app.use(cors())

//Funcionamento das Rotas

const professoresRota = require("./routes/professoresRoutes")
const trabalhoRota = require("./routes/trabalhoRoutes")

app.use("/professores", professoresRota)
app.use("/trabalho", trabalhoRota)

// Exportação

module.exports = app