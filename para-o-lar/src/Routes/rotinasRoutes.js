//vou chamar o express
// para acessar o metodo chamado Router(rotas)
 const express = require("express")
// // precisa chamar o controller
 const controller = require("../controller/rotinasController")
 
// // criar uma variavel para routes
 const routes = express.Router()

// // //criar rotas
// uma rota para listar todos os pacientes(GET)
 routes.get("/todas",controller.rotinaDasProfs)
 //rota para criar paciente (POST)
 routes.post("/cadastrar", controller.cadastrarNovaRotina)
 //rota para listar por id(GET)
routes.get("/filtrar/:id", controller.buscarPorId)
 //rota para listar nome, se tiver nome social, trazer (GET)
 routes.get("/filtrarEscola", controller.buscarPorEscola)
// // // rota para atualizar o cadastro do paciente (PUT)
routes.put("/atualizar/:id",controller.atualizarRotina)
// // //rota para deletar o cadastro(DELETE)
routes.delete("/excluir/:id", controller.deletarRotina)




 //exportar os routes
 module.exports = routes
 