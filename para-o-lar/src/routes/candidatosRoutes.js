const express = require('express');
const controller = require("../controller/candidatosController")
const routes = express.Router()

routes.get("/todos", controller.todosCandidatos)

routes.get("/filtrar/:id", controller.buscarPorId)

routes.get("/filtrarNome", controller.buscarPorNome)
routes.get("/filtrarProfissao", controller.buscarPorProfissao)

routes.post("/cadastrar", controller.cadastrarCandidatos)

routes.put("/atualizar/:id", controller.atualizarCandidatos)

routes.delete("/excluir/:id", controller.excluirCandidatos)

module.exports = routes