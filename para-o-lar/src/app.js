const express = require("express")   //VARiÁVEL PARA IMPORTAR EXPRESS
const cors = require("cors")         //VARiÁVEL PARA IMPORTAR O CORS
const app = express()                //VARiÁVEL PARA USAR O APP DO EXPRESS

app.use(express.json())              //PERMITE BODYPARSER
app.use(cors())             

//DEFININDO AS ROTAS RAÍZES

const artistasRoutes = require("./routes/artistasRoutes.js")
const discografiasRoutes  = require("./routes/discografiasRoutes.js")

app.use("/artistas", artistasRoutes)
app.use("/discografias", discografiasRoutes)

module.exports = app