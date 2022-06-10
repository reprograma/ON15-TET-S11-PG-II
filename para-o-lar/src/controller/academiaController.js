const clienteModel = require('../models/clientesModel.json')
const fichasAcademia = require('../models/fichaAcademiaModel.json')


/* Rotas para dados de cliente*/

const todosClientes = (request, response) => {
    try {
        if (clienteModel.length == 0) throw new Error('Ocorreu um erro, não foi possivel trazer as lista de clientes')
        response.status(200).send(clienteModel)
    } catch (error) {
        response.status(500).json({
            message: error.message
        })
    }
}

const clientePorId = (request, response) => {
    try {
        const idCliente = request.params.id
        if (idCliente == null || idCliente == undefined) throw new Error('Ocorreu um erro,não foi digitado o ID do cliente que deseja encontrar')
        const clienteEncontrado = clienteModel.find(cliente => cliente.clienteId == idCliente)
        if (!clienteEncontrado) throw new Error('Ocorreu um erro,não foi encontrado nenhum cliente com id digitado')
        response.status(200).send(clienteEncontrado)

    } catch (error) {
        response.status(500).json({
            message: error.message
        })
    }
}


const clientePorNome = (request, response) => {
    try {
        const nomeCliente = request.query.nome
        if (nomeCliente == null || nomeCliente == undefined) throw new Error('Ocorreu um erro,não foi digitado o nome do cliente que deseja encontrar')
        const clienteEncontrado = clienteModel.filter(cliente => cliente.nome.toLocaleLowerCase().includes(nomeCliente.toLocaleLowerCase()))
        if (clienteEncontrado.length == 0) throw new Error('Ocorreu um erro,não foi encontrado nenhum cliente com nome digitado')
        response.status(200).send(clienteEncontrado)

    } catch (error) {
        response.status(500).json({
            message: error.message
        })
    }
}


const cadastrarCliente = (request, response) => {
    try {
        const novocliente = request.body
        if (novocliente == null || novocliente == undefined) throw new Error('Ocorreu um erro,não foi enviado os dados do novo cliente que deseja cadastrar')
        if (novocliente.nome == undefined && novocliente.telefone == undefined) throw new Error('Ocorreu um erro,não foi enviado o nome e o telefone do novo cliente,por favor inserir dados obrigatorios')

        const clienteNovo = {
            id: clienteModel.length + 1,
            nome: novocliente.nome,
            idade: novocliente.idade,
            endereco: novocliente.endereco,
            telefone: novocliente.telefone,
            cpf: novocliente.cpf
        }
        clienteModel.push(clienteNovo)
        response.status(200).send(clienteNovo)

    } catch (error) {
        response.status(500).json({
            message: error.message
        })
    }
}

const atualizarCadastro = (request, response) => {
    try {
        const idCliente = request.params.id
        const atualizarCliente = request.body
        if (idCliente == null || idCliente == undefined) throw new Error('Ocorreu um erro,não foi digitado o ID do cliente que deseja atualizar')
        const clienteEncontrado = clienteModel.find(cliente => cliente.clienteId == idCliente)
        if (!clienteEncontrado) throw new Error('Ocorreu um erro,não foi encontrado nenhum cliente com id digitado')
        for (let dado in atualizarCliente) {
            console.log(dado)
            clienteEncontrado[dado] = atualizarCliente[dado]
        }
        response.status(200).json([{
            "mensagem": "Cliente atualizado",
            clienteEncontrado
        }])

    } catch (error) {
        response.status(500).json({
            message: error.message
        })
    }
}

const excluirCliente = (request, response) => {
    try {
        const idCliente = request.params.id
        if (idCliente == null || idCliente == undefined) throw new Error('Ocorreu um erro,não foi digitado o ID do cliente que deseja atualizar')
        const clienteEncontrado = clienteModel.find(cliente => cliente.clienteId == idCliente)
        if (!clienteEncontrado) throw new Error('Ocorreu um erro,não foi encontrado nenhum cliente com id digitado')
        const indice = clienteModel.indexOf(clienteEncontrado)
        clienteModel.splice(indice, 1)
        response.status(200).send("Cliente excluido com sucesso")

    } catch (error) {
        response.status(500).json({
            message: error.message
        })
    }
}

/* Rotas ligando cliente e ficha */


const fichaPoridCliente = (request, response) => {
    try {
        const idCliente = request.params.id
        if (idCliente == null || idCliente == undefined) throw new Error('Ocorreu um erro,não foi digitado o ID do cliente')
        const fichas = fichasAcademia.filter(ficha => ficha.clienteid == idCliente)
        if (fichas.length == 0) throw new Error('Ocorreu um erro,não foi encontrado nenhuma ficha desse cliente do id digitado')
        for (let item of fichas) {
            item.clienteid = clienteModel.find(cliente => cliente.clienteId == idCliente)
        }

        response.status(200).send(fichas)

    } catch (error) {
        response.status(500).json({
            message: error.message
        })
    }
}


const cadastrarFicha = (request, response) => {
    try {
        const novaFicha = request.body
        if (novaFicha.clienteid == null || novaFicha.clienteid == undefined) throw new Error('Ocorreu um erro,não foi digitado o ID do cliente que deseja cadastrar uma nova ficha')
        const cliente = clienteModel.find(cliente => cliente.clienteId == novaFicha.clienteid)
        if (!cliente) throw new Error('Ocorreu um erro,não existe nenhum cliente com o id enviado nos dados')
        const fichaNova = {
            fichaId: fichasAcademia.length + 1,
            clienteid: novaFicha.clienteid,
            exercicios: novaFicha.exercicios
        }
        fichasAcademia.push(fichaNova)

        response.status(200).send(fichaNova)
    } catch (error) {
        response.status(500).json({
            message: error.message
        })
    }
}












module.exports = {
    todosClientes,
    clientePorId,
    clientePorNome,
    cadastrarCliente,
    atualizarCadastro,
    excluirCliente,
    fichaPoridCliente,
    cadastrarFicha
}