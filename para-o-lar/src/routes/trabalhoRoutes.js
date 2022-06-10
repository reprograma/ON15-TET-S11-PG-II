// Chamar o express

const express = require("express")

// Chamar o controller

const controller = require("../controllers/trabalhoController")

// Criar variável para routes

const routes = express.Router()

// Criação das rotas

routes.get("/todos", controller.todosTrabalhos)
routes.get("/filtrar/T/:id", controller.buscarPorIdTrabalho)
routes.get("filtrar/P/:id", controller.buscarPorIdProfessor)
routes.get("/filtrarFaculdade", controller.buscarPorFaculdade)
routes.post("/cadastrar", controller.cadastrarTrabalhos)
routes.put("/atualizar/:id", controller.atualizarTrabalhos)
routes.delete("/excluir/:id", controller.excluirTrabalho)

// Exportação do Routes

module.exports = routes