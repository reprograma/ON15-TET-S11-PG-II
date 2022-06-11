const express = require("express")

const controller = require("../controller/clienteController")

const routes = express.Router()


// rotas
// uma rota para listar todos os pacientes (GET)
routes.get("/todos", controller.todosClientes)

// Listar os clientes da loja pelo id (GET)
routes.get("/encontrarcliente/:id", controller.encontrarCliente)

// Listar os clientes da loja pelo nome e nome social (GET)
routes.get("/filtrarNome", controller.buscarPorNome)

// Cadastrar no sistema um cliente (POST)
routes.post("/cadastrar", controller.cadastrarClientes)

// uma rota para atualizar o cadastro do paciente (PUT)
routes.put("/atualizar/:id", controller.atualizarClientes)

// uma rota para deletar o cadastro (DELETE)
routes.delete("/excluir/:id", controller.excluirCliente)

// exportar o routes
module.exports = routes