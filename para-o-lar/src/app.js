const express = require("express")

const cors = require("cors")

const app = express ()

app.use(express.json())

app.use(cors())

const iniciativasRota = require("./routes/iniciativasRoutes")
const acoesRota = require("./routes/acoesRoutes")

app.use("/iniciativas", iniciativasRota)
app.use("/acoes", acoesRota)

module.exports = app