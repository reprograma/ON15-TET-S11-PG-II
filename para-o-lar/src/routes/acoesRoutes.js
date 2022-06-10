const controller = require("../controllers/acoesController")
const express = require("express");
const routes = express.Router()

routes.get("/all", controller.getAll)
routes.get("/filterAcoes", controller.getByAcoes)
routes.get("/filterObservacoes", controller.getByObservacoes)
routes.post("/create", controller.createAcao)
routes.put("/update/:id", controller.updateAcao)
routes.delete("/delete/:id", controller.deleteById)


module.exports = routes