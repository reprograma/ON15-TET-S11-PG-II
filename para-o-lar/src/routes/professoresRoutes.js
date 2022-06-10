// Chamar o express

const express = require("express")

// Chamar o controller

const controller = require("../controllers/professoresController")

// Criar variável para routes

const routes = express.Router()

// Criação das rotas

routes.get("/todos", controller.todosProfessores)
routes.get("/filtrar/:id", controller.buscarPorId)
routes.get("filtrarNome", controller.buscarPorNome)
routes.get("/filtrarCPF", controller.buscarPorCPF)
routes.post("/cadastrar", controller.cadastrarProfessores)
routes.put("/atualizar/:id", controller.atualizarProfessores)
routes.delete("/excluir/:id", controller.excluirProfessor)

// Exportação do Routes

module.exports = routes