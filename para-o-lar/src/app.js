const express = require("express")
const cors = require("cors")
const desabrigadosRouter = require("./routes/desabrigadosRouter")
const abrigosRouter = require("./routes/abrigosRouter")

const app = express()

app.use(express.json())
app.use(cors())

app.use("/desabrigados", desabrigadosRouter)
app.use("/abrigos", abrigosRouter)

module.exports = app