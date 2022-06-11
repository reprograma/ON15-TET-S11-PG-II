const express = require("express")
const app = express() 
const cors = require("cors")

app.use(express.json())
app.use(cors())

const businessRoutes = require("./routes/businessRoutes")
const clientsRoutes = require("./routes/clientsRoutes")




app.use("/stores", businessRoutes)
app.use("/clients", clientsRoutes)

module.exports = app