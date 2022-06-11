const express = require("express")


const controller = require("../controller/alunosController")

const routes = express.Router()

routes.get("/todos", controller.todosAlunos)
routes.get("/filtrar/:id", controller.buscarID)
routes.post("/cadastar", controller.cadastrandoAluno)
routes.put("/atualizar", controller.atualizandoInformacoes)
routes.delete("/deletar", controller.deletandoAluno)










module.exports = routes