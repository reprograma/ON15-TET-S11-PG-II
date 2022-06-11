const express = require("express")                                      //IMPORTANDO A DEPENDÊNCIA
const controller =  require("../controllers/discografiasController")    //IMPORTANDO A CONTROLLER
const router = express.Router()                                         //CHAMANDO A ROUTER DO EXPRESS

router.get("/", controller.getAll)
// router.get("/lista", controller.getByArtistId)




module.exports = router                                                //EXPORTAR TODAS AS ROTAS