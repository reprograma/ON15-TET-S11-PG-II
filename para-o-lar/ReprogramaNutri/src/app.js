const express = require("express")

const cors = require("cors")

const pacientesRotas = require("./routes/pacienteNutriRoutes")

const consultaRotas = require("./routes/consultaNutriRoutes")

const app = express()

app.use(cors())

app.use(express.json())

app.use("/pacientes", pacientesRotas)

app.use("/consultas", consultaRotas)



module.exports = app   