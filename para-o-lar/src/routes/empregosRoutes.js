const express = require('express');
const controller = require("../controller/empregosController")
const routes = express.Router()

routes.get("/todos", controller.todasVagasEmpregos)

routes.get("/filtrar/:id", controller.buscarPorId)

routes.get("/filtrarVaga", controller.buscarPorVaga)