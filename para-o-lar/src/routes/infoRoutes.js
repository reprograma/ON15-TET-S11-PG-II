const express = require("express")

const controller = require("../controller/infoController")
const controllerr = require("../controller/clienteController")


const routes = express.Router()


// rotas
// 1. Listar todos os equipamentos que há no sistema GET
routes.get("/todos", controller.infoClientes);



// 2. Listar todos os problemas de todas os equipamentos que há no sistema GET
routes.get("/encontrarproblemas", controller.encontrarProblema);



// 3. Cadastrar no sistema um cliente (POST)
routes.post("/cadastrar", controller.cadastrarClientes)


// 4. Analisar se há algo que cabe ser atualizado nessa ficha de cadastro de manutençaão de impressoras (PUT)
routes.put("/atualizar/:id", controller.atualizarClientes)


// 5. Pensar se é válido deletar alguma ficha de cadastro de manutenção de impressora (DELETE)
routes.delete("/excluir/:id", controller.excluirCliente)

// exportar o routes
module.exports = routes



// Quero que o put não apague caso esteja em branco no body
// - Quero que consigam trazer o cliente dentro da logica depois de cadastrar, por id.
