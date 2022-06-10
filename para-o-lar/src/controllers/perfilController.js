//importar o controller 
const alunos = require("../controllers/alunoController")

//importar o json/banco de dados
const perfis = require("../models/perfilAlunosModels.json")

//Listar todos os perfis de alunos (GET)
const perfisAlunos = (request, response) => {
    response.status(200).json({
        "mensagem": "Esses são os alunos cadastrados em nossa academia",
        perfis
    })

}

//Listar todos os treinos atrelados ao aluno (GET)
const treinoPorId = (request, response) => {
    try {
        //identificar o id do parâmetro
        const chamarId = request.params.id
        //comparar id da request com o id do banco de dados/json
        const acharId = perfis.find(perfil => perfil.perfilId == chamarId)
        if(!acharId) {
            throw new Error("Id não encontrado")
        }
        response.status(200).json(acharId.treinoPrescrito)
    } catch(error) {
        response.status(500).json({
            message: error.message
        })
    }
}

//Cadastrar novo perfil de aluno (POST)
const cadastrarPerfil= (request, response) => {
    try {

        const pegarId = request.params.id
        const alunoEncontrado = alunos.buscarPorIdParaOPerfil(pegarId)

        const pegarBody = request.body
        let novoPerfil = {
            perfilId: (perfis.length) + 1,
            aluno: alunoEncontrado,
            planoAluno: pegarBody.planoAluno,
            pagamento: pegarBody.pagamento,
            objetivosAluno: pegarBody.objetivosAluno,
            questionarioAvaliacao: pegarBody.questionarioAvaliacao,
            resultadoAvaliacao: pegarBody.resultadoAvaliacao,
            treinoPrescrito: pegarBody.treinoPrescrito,
            recomendacoes: pegarBody.recomendacoes
        }
        perfis.push(novoPerfil)

        response.status(201).json({
            "mensagem": "Perfil cadastrado com sucesso!",
            novoPerfil
        })
    } catch (error) {
        response.status(500).json({
            message: error.message
        })
        console.log(error)
    }
}

//Atualizar perfil atrelado ao aluno (PUT)
const atualizarPerfil = (request, response) => {
    try {
        const pegarId = request.params.id
        const pegarBody = request.body


        const perfilEncontrado = perfis.find(perfil => perfil.perfilId == pegarId)

        const indice = perfis.indexOf(perfilEncontrado)

        let pagamentoUp = {
            data: pegarBody.pagamento.data || perfilEncontrado.pagamento.data,
            metodo: pegarBody.pagamento.metodo || perfilEncontrado.pagamento.metodo,
            preço: pegarBody.pagamento.preço || perfilEncontrado.pagamento.preço
        }            
       
        pegarBody.perfisId == pegarId
        let updatePerfil = {
            alunoId: pegarId,
            aluno: perfilEncontrado.aluno,
            planoAluno: pegarBody.planoAluno || perfilEncontrado.planoAluno,
            pagamento: pagamentoUp,
            objetivosAluno: pegarBody.objetivosAluno || perfilEncontrado.objetivosAluno,
            questionarioAvaliacao: pegarBody.questionarioAvaliacao || perfilEncontrado.questionarioAvaliacao,
            resultadoAvaliacao: pegarBody.resultadoAvaliacao || perfilEncontrado.resultadoAvaliacao,
            treinoPrescrito: pegarBody.treinoPrescrito || perfilEncontrado.treinoPrescrito,
            recomendacoes: pegarBody.recomendacoes || perfilEncontrado.recomendacoes
        }

        perfis.splice(indice, 1, updatePerfil)

        if(perfilEncontrado == undefined) {
            throw new Error("Perfil não encontrado, pois o id não foi identificado.")
        }

        response.status(200).json({
            "mensagem": "Dados do perfil atualizado com sucesso",
            updatePerfil
        })
    } catch (error) {
        response.status(500).json({
            message: error.message
        })
        console.log(error)
    }
}

//Deletar perfil de aluno (DELETE)
const excluirPerfil = (request, response) => {
    try {
        const pegarId = request.params.id
        const perfilEncontrado = perfis.find(perfil => perfil.perfilId == pegarId)

        const indice = perfis.indexOf(perfilEncontrado)

        perfis.splice(indice, 1)

        if(perfilEncontrado == undefined) {
            throw new Error("Id não encontrado.")
        }

        response.status(200).json({
            "mensagem": "Perfil excluido com sucesso."
        })
    } catch (error) {
        response.status(500).json({
            message: error.message
        })
        console.log(error)
    }
}

module.exports = {
    perfisAlunos,
    treinoPorId,
    cadastrarPerfil,
    atualizarPerfil,
    excluirPerfil
}