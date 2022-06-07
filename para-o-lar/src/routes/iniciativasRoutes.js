const express = require("express")

const controller = require("../controllers/iniciativasController")

const routes = express.Router()

routes.get("/todas", controller.allIniciativas)
routes.get("/filter/:id", controller.findById)
routes.get("/filterName", controller.findByName)
routes.post("/create", controller.createIniciativa)
module.exports = routes