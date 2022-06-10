// Importação do Json

const trabalhos = require("../models/trabalhoModel.json")

const todosTrabalhos = (request, response) => {
    response.status(200).json({
        "mensagem": "Esses são os trabalhos cadastrados de cada professor em nosso servidor:",
        trabalhos
    })
}

// Listagem por Id do trabalho (GET)

const buscarPorIdTrabalho = (request, response) => {
    try {
        const chamarId = request.params.id
        const acharId = trabalhos.find(trabalho => trabalho.trabalhoId == chamarId)
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

// Listagem por Id do Professor (GET)

const buscarPorIdProfessor = (request, response) => {
    try {
        const chamarId = request.params.id
        const acharId = professores.find(professor => professor.professorId == chamarId)
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

// Listagem por Faculdade (GET)

const buscarPorFaculdade = (request, response) => {
    try {
        const trazerFaculdade = request.query.faculdade.toLowerCase()
        const encontrarFaculdade = faculdades.filter(faculdade =>{
            return professor.professor.toLowerCase().includes(trazerFaculdade)
        })

        if(encontrarFaculdade.length == 0) {
            throw new Error("Faculdade não encontrada.")
        }

        response.status(200).json({
            "mensagem": "Faculdade encontrada:",
            encontrarFaculdade
        })
    } catch (error) {
        response.status(500).json({
            message: error.message
        })
        console.log(error)
    }
}

// Cadastramento de um trabalho (POST)

const cadastrarTrabalhos = (request,response) => {
    try {
        const pegarBody = request.body
        let novoTrabalho = {
            trabalhoId: (trabalhos.length) + 1,
            professorId: (professores.length) + 1,
            faculdade: pegarBody.faculdade,
            curso: pegarBody.curso,
            materia: pegarBody.materia,
            classe: pegarBody.classe
        }

        trabalhos.push(novoTrabalho)

        response.status(201).json({
            "mensagem": "Trabalho cadastrado com sucesso!",
            novoTrabalho
        })
    } catch (error) {
        response.status(500).json({
            message: error.message
        })
        console.log(error)
    }
}

// Atualizar o cadastro de um trabalho (PUT)

const atualizarTrabalhos = (request, response) => {
    try {
        const pegarId = request.params.id
        const pegarBody = request.body

        const trabalhoEncontrado = trabalhos.find(trabalho => trabalho.trabalhoId == pegarId)

        const indice = trabalhos.indexOf(trabalhoEncontrado)

        pegarBody.trabalhoId == pegarId

        trabalhos.splice(indice, 1, pegarBody)

        if(trabalhoEncontrado == undefined) {
            throw new Error("Trabalho não encontrado, porque o Id não foi identificado.")
        }

        response.status(200).json({
            "mensagem": "Dados do trabalho atualizado com sucesso!",
            pegarBody
        })
    } catch (error) {
        response.status(500).json({
            message: error.message
        })
        console.log(error)
    }
}

// Deletar o cadastro de um trabalho (DELETE)

const excluirTrabalho = (request, response) => {
    try {
        const pegarId = request.params.id
        const trabalhoEncontrado = trabalhos.find(trabalho => trabalho.trabalhoId == pegarId)
        
        const indice = trabalhos.indexOf(trabalhoEncontrado)

        trabalhos.splice(indice, 1)

        if(trabalhoEncontrado == undefined) {
            throw new Error("Id não encontrado.")
        }

        response.status(200).json({
            "mensagem": "Trabalho deletado com sucesso!"
        })
    } catch (error) {
        response.status(500).json({
            message: error.message
        })
        console.log(error)
    }
}

// Exportação das Variáveis do Controller de Trabalho

module.exports = {
    todosTrabalhos,
    buscarPorIdTrabalho,
    buscarPorIdProfessor,
    buscarPorFaculdade,
    cadastrarTrabalhos,
    atualizarTrabalhos,
    excluirTrabalho
}