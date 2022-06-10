const express = require('express')
const cors = require('cors')
const app = express()
const routes= require('../src/routes/academiaRoutes')
app.use(express.json())
app.use(cors())
app.use("/clientes",routes)









module.exports = app