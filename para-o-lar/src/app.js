const express = require("express")
const cors = require("cors")
const desabrigadosRouter = require("../src/models/desabrigados.json")
const abrigosRouter = require("../src/models/abrigos.json")

const app = express()

app.use(express.json())
app.use(cors())

app.use("/desabrigados", desabrigadosRouter)
app.use("/abrigos", abrigosRouter)

module.exports = app