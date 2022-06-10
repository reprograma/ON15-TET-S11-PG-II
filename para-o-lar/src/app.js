const express = require("express")

const cors = require("cors")

const app = express()

app.use(express.json())

app.use(cors())


const feiraRota = require("./routes/feiraRoutes")

app.use("/feira", feiraRota)


module.exports = app