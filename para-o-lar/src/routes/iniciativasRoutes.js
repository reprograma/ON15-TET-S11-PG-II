const express = require("express")

const controller = require("../controllers/iniciativasController")

const routes = express.Router()

routes.get("/todas", controller.allIniciativas)
routes.get("/filter/:id", controller.findById)
routes.get("/filterName", controller.findByName)
routes.get("/filterTemas", controller.findByTemas)
routes.post("/create", controller.createIniciativa)
routes.put("/update/:id", controller.updateIniciativa)
routes.delete("/delete/:id", controller.deleteById)
module.exports = routes