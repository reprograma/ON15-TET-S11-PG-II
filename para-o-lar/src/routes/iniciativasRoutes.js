const express = require("express")

const controller = require("../controllers/iniciativasController")

const routes = express.Router()

routes.get("/todas", controller.allIniciativas)

module.exports = routes