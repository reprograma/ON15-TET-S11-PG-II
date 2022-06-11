const express = require("express")

const cors = require ("cors")

const app = express()

app.use(express.json())

app.use(cors())


// rotas raiz

const clientesRota = require("./routes/clienteRoutes")
const infoRota = require("./routes/infoRoutes")

app.use("/clientes", clientesRota)
app.use("/info", infoRota)

module.exports = app

