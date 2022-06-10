const express = require("express")

const controller = require("../controller/feiraController")

const routes = express.Router()

routes.get("/all", controller.allBusiness)

module.exports = routes