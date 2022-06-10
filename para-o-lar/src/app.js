const express = require("express")
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(cors())


const alunosRota = require("./routes/alunosRoutes")
const atendimentoRota = require("./routes/atendimentoRoutes")

app.use("/alunos", alunosRota)
app.use("/atendimento", atendimentoRota)



module.exports = app
