const clientes = require("../models/clientesModel.json")
const clientesInfoModel = require("../models/clientesInfoModel.json")


// 1. Cadastro de todos os problemas relatados pelo cliente, contendo a data de entrada do equipamento na oficina

// 2. Listar todos os equipamentos que há no sistema GET
const infoClientes = (request, response) => {
    response.status(201).json({
        "mensagem": "Essas são as informações dos produtos dos clientes cadastrados no sistema",
         clientesInfoModel 
    })
}
   
// 3. Listar todos os problemas de todas os equipamentos que há no sistema GET
const encontrarProblema = (request, response) => {
    try {
        let importarId = request.params.id
        let problemaCliente = problemas.find(problema => problema.atendimentoId == importarId)

        if(problemaCliente == undefined) throw new Error ()

        let idCliente = problemaCliente.cliente
        let problemaEncontrado = clientesInfoModel.find(cliente => cliente.atendimentoId == idCliente)
        

        problemaCliente.cliente = problemaEncontrado

        response.status(200).send(problemasEquipamento)

    } catch (error) {
        response.status(500).send({message: error.message})
        console.log(error)
    }
}

// 4. Cadastrar no sistema um cliente (POST)
const cadastrarClientes = (request, response) => {
    try {
        const pegarBody = request.body
        let novaOs = {
            id: (clientesInfoModel.length) + 1,
            problemasEquipamento: pegarBody.problemasEquipamento,
            testesEfetuados: pegarBody.testesEfetuados,
            solucaoApresentada: pegarBody.solucaoApresentada,
            orcamentoAprovado: pegarBody.orcamentoAprovado,
            recomendacoes: pegarBody.recomendacoes,
            datadeentradadoequipamento: pegarBody.datadeentradadoequipamento
                
        }

        clientesInfoModel.push(novaOs)

        response.status(201).json({
            "mensagem": "Ordem de serviço cadastrada com sucesso!",
            novaOs
        })
    } catch (error) {
        response.status(500).json({
            message: error.message
        })
        console.log(error)
    }
}

// 5. Analisar se há algo que cabe ser atualizado nessa ficha de cadastro de manutençaão de impressoras (PUT)

const atualizarClientes = (request, response) => {
    try {
        const pegarId = request.params.id
        const pegarBody = request.body


        const clienteEncontrado = clientesInfoModel.find(cliente => cliente.atendimentoId == pegarId)

        const indice = clientesInfoModel.indexOf(clienteEncontrado)
       
        pegarBody.atendimentoId == pegarId

        clientesInfoModel.splice(indice, 1, pegarBody)

        if(clienteEncontrado == undefined) {
            throw new Error("Orçamento não encontrado, pois o id não foi identificado.")
        }

        response.status(200).json({
            "mensagem": "Dados do orçamento atualizados com sucesso",
            pegarBody
        })
    } catch (error) {
        response.status(500).json({
            message: error.message
        })
        console.log(error)
    }
}



// 5. Pensar se é válido deletar alguma ficha de cadastro de manutenção de impressora (DELETE)

const excluirCliente = (request, response) => {
    try {
        const pegarId = request.params.id
        const clienteEncontrado = clientesInfoModel.find(cliente => cliente.id == pegarId)

        const indice = clientesInfoModel.indexOf(clienteEncontrado)

        clientesInfoModel.splice(indice, 1)

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
    infoClientes,
    encontrarProblema,
    cadastrarClientes,
    atualizarClientes,
    excluirCliente
    
}





