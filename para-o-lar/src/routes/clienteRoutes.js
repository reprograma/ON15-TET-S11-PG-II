const express = require("express")

const controller = require("../controller/clienteController")

const routes = express.Router()


// rotas
// uma rota para listar todos os pacientes (GET)
routes.get("/todos", controller.todosClientes)

// Listar os clientes da loja pelo id (GET)
routes.get("/filtrarNome", controller.buscarPorNome)

// Listar os clientes da loja pelo nome e nome social (GET)
routes.get("/encontrarcliente/:id", controller.encontrarCliente)



// exportar o routes
module.exports = routes