const express = require("express")
// preciso chamar o controller
const controller = require("../controllers/gatosController")
// preciso criar uma variavel pra o routes
const routes = express.Router()

routes.get("/todos", controller.todosGatos)

routes.get("/filtrar/:id", controller.buscarPorId)

routes.post("/cadastrar", controller.cadastrarGatos)

routes.put("/atualizar/:id", controller.atualizarGatos)

routes.delete("/excluir/:id", controller.excluirGato)

module.exports = routes