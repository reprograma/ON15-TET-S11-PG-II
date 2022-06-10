//vou chamar o express
// para acessar o metodo chamado Router(rotas)
const express = require("express")
// precisa chamar o controller
const controller = require("../controller/professorasController")
// criar uma variavel para routes
const routes = express.Router()

//criar rotas
routes.get("/todas",controller.todasProfessoras)
// uma rota para listar todos os pacientes(GET)
//rota para criar paciente (POST)
routes.post("/cadastrar", controller.cadastrarProfessora)
//rota para listar por id(GET)
routes.get("/filtrar/:id", controller.buscarPorId)
//rota para listar nome, se tiver nome social, trazer (GET)
routes.get("/filtrarNome", controller.buscarPorNome)
// rota para atualizar o cadastro do paciente (PUT)
routes.put("/atualizar/:id",controller.atualizarProfessora)
//rota para deletar o cadastro(DELETE)
routes.delete("/excluir/:id", controller.deletarProfessora)
//routes.delete("/delete/nome", controller.deletarPorNome)

//exportar os routes
module.exports = routes