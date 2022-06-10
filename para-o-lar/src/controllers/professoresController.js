// Importação do Json

const professores = require("../models/professoresModel.json")

const todosProfessores = (request, response) => {
    response.status(200).json({
        "mensagem": "Esses são os professores cadastrados em nosso servidor:",
        professores
    })
}

// Listagem por Id (GET)

const buscarPorId = (request, response) => {
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

// Listagem por Nome ou Nome Social, se tiver (GET)

const buscarPorNome = (request, response) => {
    try {
        const trazerNome = request.query.nome.toLowercase()
        const encontrarNome = professores.filter(professor => {
            if(professor.nomeSocial) {
                return professor.nomeSocial.toLowerCase().includes(trazerNome)
            }
            return professor.nome.toLowerCase().includes(trazerNome)
        })

        if(encontrarNome.length == 0) {
            throw new Error("Nome não encontrado.")
        }

        response.status(200).json({
            "mensagem": "Professor encontrado:",
            encontrarNome
        })
    } catch (error) {
        response.status(500).json({
            message: error.message
        })
        console.log(error)
    }
}

// Listagem por CPF (GET)

const buscarPorCPF = (request, response) => {
    try {
        const trazerCPF = request.query.cpf.toLowerCase()
        const encontrarCPF = professores.filter(professor =>{
            return professor.cpf.toLowerCase().includes(trazerCPF)
        })

        if(encontrarCPF.length == 0) {
            throw new Error("CPF não encontrado.")
        }

        response.status(200).json({
            "mensagem": "CPF encontrado:",
            encontrarCPF
        })
    } catch (error) {
        response.status(500).json({
            message: error.message
        })
        console.log(error)
    }
}

// Cadastramento de um professor (POST)

const cadastrarProfessores = (request,response) => {
    try {
        const pegarBody = request.body
        let novoProfessor = {
            professorId: (professores.length) + 1,
            nome: pegarBody.nome,
            nomeSocial: pegarBody.nomeSocial,
            idade: pegarBody.idade,
            identidadeGenero: pegarBody.identidadeGenero,
            orientacaoSexual: pegarBody.orientacaoSexual,
            endereco: pegarBody.endereco,
            telefone: pegarBody.telefone,
            cpf: pegarBody.cpf
        }

        professores.push(novoProfessor)

        response.status(201).json({
            "mensagem": "Professor cadastrado com sucesso!",
            novoProfessor
        })
    } catch (error) {
        response.status(500).json({
            message: error.message
        })
        console.log(error)
    }
}

// Atualizar o cadastro de um professor (PUT)

const atualizarProfessores = (request, response) => {
    try {
        const pegarId = request.params.id
        const pegarBody = request.body

        const professorEncontrado = professores.find(professor => professor.professorId == pegarId)

        const indice = professores.indexOf(professorEncontrado)

        pegarBody.professorId == pegarId

        professores.splice(indice, 1, pegarBody)

        if(professorEncontrado == undefined) {
            throw new Error("Professor não encontrado, porque o Id não foi identificado.")
        }

        response.status(200).json({
            "mensagem": "Dados do professor atualizado com sucesso!",
            pegarBody
        })
    } catch (error) {
        response.status(500).json({
            message: error.message
        })
        console.log(error)
    }
}

// Deletar o cadastro de um professor (DELETE)

const excluirProfessor = (request, response) => {
    try {
        const pegarId = request.params.id
        const professorEncontrado = professores.find(professor => professor.professorId == pegarId)
        
        const indice = professores.indexOf(professorEncontrado)

        professores.splice(indice, 1)

        if(professorEncontrado == undefined) {
            throw new Error("Id não encontrado.")
        }

        response.status(200).json({
            "mensagem": "Professor deletado com sucesso!"
        })
    } catch (error) {
        response.status(500).json({
            message: error.message
        })
        console.log(error)
    }
}

// Exportação das Variáveis do Controller de Professores

module.exports = {
    todosProfessores,
    buscarPorId,
    buscarPorNome,
    buscarPorCPF,
    cadastrarProfessores,
    atualizarProfessores,
    excluirProfessor
}