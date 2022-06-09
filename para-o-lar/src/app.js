const express = require("express")

const cors = require ("cors")

const app = express()

app.use(express.json())

app.use(cors())


// rota raiz

const clientesRota = require("./routes/clienteRoutes")

app.use("/clientes", clientesRota)

module.exports = app

