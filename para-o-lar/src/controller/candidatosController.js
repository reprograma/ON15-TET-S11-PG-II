const candidatos = require('../models/candidatosModel.json')
const todosCandidatos = (request, response) => {
    response.status(200).json({
        "mensagem": "Essess são todos os candidatos que buscam uma oportunidade em nossa Agencia de Empregos",
        candidatos
    })
}
const buscarPorId = (request, response) => {
    try {
        const chamarId = request.params.candidatoId
        const acharId = candidatos.find(candidato => candidato.candidatoId == chamarId)
        if (!acharId) {
            throw new Error("Id não encontrada.")
        }
        response.status(200).json(acharId)

    } catch (error) {
        response.status(500).json({
            "message": error.message
        })
        console.log(error)
    }
}
const buscarPorNome = (request, response) => {
    try {
        const trazerNome = request.query.nome.toLowerCase()
        const encontrarNome = candidatos.filter(candidato => {
            if (candidato.nome) {
                return candidato.toLowerCase().includes(trazerNome)
            }

            return candidato.nome.toLowerCase().includes(trazerNome)
        })

        if (encontrarNome.length == 0) {
            throw new Error("Candidato não encontrado.")
        }
        response.status(200).json({
            "mensagem": "Candidato encontrado:",
            encontrarNome
        })
    } catch (error) {
        response.status(500).json({
            message: error.message
        })
        console.log(error)
    }
}
const buscarPorProfissao = (request, response) => {
    try {
        const trazerProfissao = request.query.profissao.toLowerCase()
        const encontrarProfissao = candidatos.filter(candidato => {
            if (candidato.profissao) {
                return candidato.toLowerCase().includes(trazerProfissao)
            }

            return candidato.profissao.toLowerCase().includes(trazerProfissao)
        })

        if (encontrarProfissao.length == 0) {
            throw new Error("Candidato não encontrado.")
        }
        response.status(200).json({
            "mensagem": "Candidato encontrado:",
            encontrarProfissao
        })
    } catch (error) {
        response.status(500).json({
            message: error.message
        })
        console.log(error)
    }
}
const cadastrarCandidatos = (request, response) => {
    try {
        const pegarBody = request.body
        let novoCandidato = {
            candidatoId: (pacientes.length) + 1,
            nome: pegarBody.nome,
            idade: pegarBody.idade,
            endereço: pegarBody.endereco,
            telefone: pegarBody.telefone,
            cpf: pegarBody.cpf,
            profissao: pegarBody.profissao
        }
        candidatos.push(novoCandidato)

        response.status(201).json({
            "mensagem": " Candidato cadastrado com sucesso",
            novoCandidato
        })

    } catch (error) {
        response.status(500).json({
            message: error.message
        })
        console.log(error)
    }
}
const atualizarCandidatos = (request, response) => {
    try {
        const pegarId = request.params.id
        const pegarBody = request.body


        const candidatoEncontrado = candidatos.find(candidato => candidato.candidatoId == pegarId)

        const indice = candidatos.indexOf(candidatoEncontrado)

        pegarBody.candidatoId == pegarId

        candidatos.splice(indice, 1, pegarBody)

        if (candidatoEncontrado == undefined) {
            throw new Error("Candidato não encontrado, pois o id não foi identificado.")
        }

        response.status(200).json({
            "mensagem": "Dados do pcandidato atualizado com sucesso",
            pegarBody
        })
    } catch (error) {
        response.status(500).json({
            message: error.message
        })
        console.log(error)
    }
}
const excluirCandidatos = (request, response) => {
    try {
        const pegarId = request.params.id
        const candidatoEncontrado = candidatos.find(candidato => candidato.candidatoId == pegarId)
        const indice = candidatos.indexOf(candidatoEncontrado)
        candidatos.splice(indice, 1)
        if (candidatoEncontrado == undefined) {
            throw new("Id não encontrado.")
        }
        response.status(200).json({
            "mensagem": "Candidato excluido com sucesso!"
        })


    } catch (error) {
        response.status(500).json({
            message: error.message
        })
        console.log(error)
    }
}


module.exports = {
    todosCandidatos,
    buscarPorId,
    buscarPorNome,
    buscarPorProfissao,
    cadastrarCandidatos,
    atualizarCandidatos,
    excluirCandidatos
}