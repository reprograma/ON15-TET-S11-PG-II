const clientes = require("../models/clientesModel.json")


// Listar os clientes da loja (GET)
const todosClientes = (request, response) => {
    response.status(200).json({
        "mensagem": "Esses são todos os clientes, cadastrados na nossa loja, de manutenção de impressoras",
        clientes
    })
}

// Listar os clientes da loja pelo id (GET)
const encontrarCliente = (req, res) => {
    const clienteId = req.params.id
    const encontrarClientePorId = clientes.find(cliente => cliente.id == clienteId)
    if (encontrarClientePorId) {
        res.status(200).send(encontrarClientePorId)
    } else {
        res.status(404).send({ message: "cliente não encontrado" })
    }
}


// Listar os clientes da loja pelo nome e nome social (GET)
// se nome != do nome social então imprima nome social
// se nome == null, nome == undefined então returne nomeSocial

const buscarPorNome = (request, response) => {
    try {
        const trazerPorNome = request.query.nome.toLowerCase()
        const encontrarCliente = clientes.filter(cliente => {
            
            if(cliente.nomeSocial) {
                return cliente.nomeSocial.toLowerCase().includes(trazerPorNome)
            }

          return cliente.nome.toLowerCase().includes(trazerPorNome)
        })

        if(encontrarCliente.length == 0) {
            throw new Error("Cliente não encontrado")
        } 

        response.status(200).json({
            "mensagem": "Cliente encontrado",
            encontrarCliente
        }) 

    } catch (error) {
        response.status(500).json({
            message: error.message
        })
        console.log(error)
    }
}

module.exports = {
    todosClientes,
    encontrarCliente,
    buscarPorNome
}