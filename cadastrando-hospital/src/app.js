const express = require("express")
const cors = require("cors")
const patientsRouter = require("./routes/patientRouter")

const app = express()

app.use(express.json())
app.use(cors())

app.use("/patients", patientsRouter)

module.exports = app