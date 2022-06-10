const express = require("express")
const cors = require("cors")
const app = express()
app.use(express.json())
app.use(cors())



const candidatosRota = require("./routes/candidatosRoutes")
app.use("/candidatos", candidatosRota)


const empregosRota = require("./routes/empregosRoutes")
app.use("/empregos", empregosRota)


module.exports = app