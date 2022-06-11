const clientes = require("../models/clientesModel.json")
const clientesInfo = require("../models/clientesInfoModel.json")


// Listar os clientes da loja (GET)
const todosClientes = (request, response) => {
    response.status(200).json({
        "mensagem": "Esses são todos os clientes, cadastrados na nossa loja, de manutenção de impressoras",
        clientes
    })
}


// Listar os clientes da loja pelo id (GET)
const encontrarCliente = (request, response) => {
    const clienteId = request.params.id
    const encontrarClientePorId = clientes.find(cliente => cliente.id == clienteId)
    if (encontrarClientePorId) {
        response.status(200).send(encontrarClientePorId)
    } else {
        response.status(404).send({ message: "Cliente não encontrado" })
    }
}


// Listar os clientes da loja pelo nome e nome social (GET)
// se nome != do nome social então imprima nome social
// se nome == null, nome == undefined então returne nomeSocial


const buscarPorNome = (request, response) => {
    try {
        const trazerNome = request.query.nome.toLowerCase()
        const encontrarNome = clientes.filter(cliente => {
            if(cliente.nomeSocial) {
                return cliente.nomeSocial.toLowerCase().includes(trazerNome)
            }

           return cliente.nome.toLowerCase().includes(trazerNome)
        })

        // length == 0 é do filter, porque se por exemplo no postman digitar xxx, o filter não encontra nada
        // e retorna um array vazio e o erro ("Nome não encontrado"). Então para testar se coisas digitadas erradas
        // retornarão erro, usar .length == 0 no caso de array
        if(encontrarNome.length == 0) {
            throw new Error("Nome não encontrado.")
        }

        response.status(200).json({
            "mensagem": "Cliente encontrado:",
            encontrarNome
        })
    } catch (error) {
        response.status(500).json({
            message: error.message
        })
        console.log(error)
    }
}


//
// Cadastrar no sistema um cliente (POST)
const cadastrarClientes = (request, response) => {
    try {
        const pegarBody = request.body
        let novocliente = {
            id: (clientes.length) + 1,
            nome: pegarBody.nome,
            nomeSocial: pegarBody.nomeSocial,
            endereco: pegarBody.endereco,
            equipamento: pegarBody.equipamento,
            
        }

        clientes.push(novocliente)

        response.status(201).json({
            "mensagem": "Cliente cadastrado com sucesso!",
            novocliente
        })
    } catch (error) {
        response.status(500).json({
            message: error.message
        })
        console.log(error)
    }
}


// Atualizar o cadastro de um cliente no sistema (PUT)
const atualizarClientes = (request, response) => {
    try {
        const pegarId = request.params.id
        const pegarBody = request.body


        const clienteEncontrado = clientes.find(cliente => cliente.id == pegarId)

        const indice = clientes.indexOf(clienteEncontrado)
       
        pegarBody.id == pegarId

        clientes.splice(indice, 1, pegarBody)

        if(clienteEncontrado == undefined) {
            throw new Error("Cliente não encontrado, pois o id não foi identificado.")
        }

        response.status(200).json({
            "mensagem": "Dados do cliente atualizados com sucesso",
            pegarBody
        })
    } catch (error) {
        response.status(500).json({
            message: error.message
        })
        console.log(error)
    }
}


// Deletar o cadastro de um cliente (DELETE)
const excluirCliente = (request, response) => {
    try {
        const pegarId = request.params.id
        const clienteEncontrado = clientes.find(cliente => cliente.clienteId == pegarId)

        const indice = clientes.indexOf(clienteEncontrado)

        clientes.splice(indice, 1)

        if(clienteEncontrado == undefined) {
            throw new Error("Id não encontrado.")
        }

        response.status(200).json({
            "mensagem": "Cliente excluido com sucesso."
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
    buscarPorNome,
    cadastrarClientes,
    atualizarClientes,
    excluirCliente    
}


