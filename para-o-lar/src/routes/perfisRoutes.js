//chamar o express para acessar o método Router
const express = require("express")

//chamar o controller 
const controller = require("../controllers/perfilController")

//criar uma variavel para routes
const routes = express.Router()

//criar as rotas
routes.get("/todos", controller.perfisAlunos)

routes.get("/treino/:id", controller.treinoPorId)

routes.post("/cadastrar/:id", controller.cadastrarPerfil)

routes.put("/atualizar/:id", controller.atualizarPerfil) 

routes.delete("/excluir/:id", controller.excluirPerfil)

//exportar o routes 
module.exports = routes