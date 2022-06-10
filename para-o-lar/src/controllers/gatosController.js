const gatos = require("../models/gatinhos.json")

const todosGatos = (request, response) => {
    response.status(200).json({
        "mensagem": "Esses são os gatos disponíveis para adoção",
        gatos
    })
}

////GET: ler, trazer informação
const buscarPorId = (request, response) => {  
    try {
       
        const chamarId = request.params.id
        const acharId = gatos.find(gatos => gatos.gatoId == chamarId)
        if(!acharId) {
            throw new Error("Id não encontrado.")
        }
        response.status(200).json(acharId)
    } catch (error) {
        response.status(500).json({
            message: error.message
        })
        console.log(error)
    }
}

// POST: cadastrar
const cadastrarGatos = (request, response) => {
    try {
        const pegarBody = request.body
        let novoGato = {
            gatoId: (gatos.length) + 1,
            nome: pegarBody.nome,
            idade: pegarBody.idade,
            genero: pegarBody.genero,
            coloracao: pegarBody.coloracao,
            personalidade: pegarBody.personalidade,
        }

        gatos.push(novoGato)

        response.status(201).json({
            "mensagem": "Gatinho adicionado com sucesso! =)",
            novoGato
        })
    } catch (error) {
        response.status(500).json({
            message: error.message
        })
        console.log(error)
    }
}

// PUT: atualizar
const atualizarGatos = (request, response) => {
    try {
        const pegarId = request.params.id // PegarId = 3 -> o valor do Id q vem na URL, fica dentro dessa variável.
        const pegarBody = request.body

        const gatoEncontrado = gatos.find(paciente => paciente.gatoId == pegarId)

        const indice = gatos.indexOf(gatoEncontrado)
       
        pegarBody.gatoId == pegarId

        gatos.splice(indice, 1, pegarBody)

        if(gatoEncontrado == undefined) {
            throw new Error("Gatinho não encontrado, pois o Id não foi identificado.")
        }

        response.status(200).json({
            "mensagem": "Dados do gatinho atualizado com sucesso",
            pegarBody
        })
    } catch (error) {
        response.status(500).json({
            message: error.message
        })
        console.log(error)
    }
}

// DELETE: para deletar um gato.
const excluirGato = (request, response) => {
    try {
        const pegarId = request.params.id
        const gatoEncontrado = gatos.find(paciente => paciente.gatoId == pegarId)

        const indice = gatos.indexOf(gatoEncontrado)

        gatos.splice(indice, 1)

        if(gatoEncontrado == undefined) {
            throw new Error("Id não encontrado.")
        }

        response.status(200).json({
            "mensagem": "Gatinho excluido com sucesso."
        })
    } catch (error) {
        response.status(500).json({
            message: error.message
        })
        console.log(error)
    }
}

module.exports = {
    todosGatos,
    buscarPorId,
    cadastrarGatos,
    atualizarGatos,
    excluirGato
}
