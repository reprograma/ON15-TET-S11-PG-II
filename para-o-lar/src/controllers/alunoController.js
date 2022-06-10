//importar o json/banco de dados
const alunos = require("../models/alunosModel.json")

//Listar todos os alunos (GET)
const todosAlunos = (request, response) => {
    response.status(200).json({
        "mensagem": "Esses são os alunos cadastrados em nossa academia",
        alunos
    })

}

//Listar alunos por id (GET)
const buscarPorId = (request, response) => {
    try {
        //identificar o id do parâmetro
        const chamarId = request.params.id
        //comparar id da request com o id do banco de dados/json
        const acharId = alunos.find(aluno => aluno.alunoId == chamarId)
        if(!acharId) {
            throw new Error("Id não encontrado")
        }
        response.status(200).json(acharId)
    } catch(error) {
        response.status(500).json({
            message: error.message
        })
    }
}

const buscarPorIdParaOPerfil = (id) => {
    try {
        //identificar o id do parâmetro
        const chamarId = id
        //comparar id da request com o id do banco de dados/json
        const acharId = alunos.find(aluno => aluno.alunoId == chamarId)
        if(!acharId) {
           return  "Id não encontrado"
        }
       return acharId
    } catch(error) {
       return 'erro'
    }
}

//Listar alunos por nome, se tiver nome social, trazer o nome social (GET)
const buscarPorNome = (request, response) => {
    try {
        const trazerNome = request.query.nome
        const encontrarNome = alunos.filter(aluno => {
         if(aluno.nomeSocial) {
            return aluno.nomeSocial.toLowerCase().includes(trazerNome.toLowerCase())
         }
         
            return aluno.nome.toLowerCase().includes(trazerNome.toLowerCase())
        })

        if(encontrarNome.length == 0) {
            throw new Error("Nome não encontrado")
        }

        response.status(200).json({
            "mensagem": "Aluno encontrado",
            encontrarNome
        })
    } catch (error) {
        response.status(500).json({
            message: error.message
        })
        console.log(error)
    }
}

//Cadastrar aluno (POST)
const cadastrarAlunos= (request, response) => {
    try {
        const pegarBody = request.body
        let novoAluno = {
            alunoId: (alunos.length) + 1,
            nome: pegarBody.nome,
            nomeSocial: pegarBody.nomeSocial,
            idade: pegarBody.idade,
            endereco: pegarBody.endereco,
            telefone: pegarBody.telefone,
            cpf: pegarBody.cpf
        }

        alunos.push(novoAluno)

        response.status(201).json({
            "mensagem": "aluno cadastrado com sucesso!",
            novoAluno
        })
    } catch (error) {
        response.status(500).json({
            message: error.message
        })
        console.log(error)
    }
}


//Atualizar cadastro de um aluno (PUT)
const atualizarAlunos = (request, response) => {
    try {
        const pegarId = request.params.id
        const pegarBody = request.body


        const alunoEncontrado = alunos.find(aluno => aluno.alunoId == pegarId)

        const indice = alunos.indexOf(alunoEncontrado)
       
        pegarBody.alunoId == pegarId
        let updateAluno = {
            alunoId: pegarId,
            nome: pegarBody.nome || alunoEncontrado.nome,
            nomeSocial: pegarBody.nomeSocial || alunoEncontrado.nomeSocial,
            idade: pegarBody.idade || alunoEncontrado.idade,
            endereco: pegarBody.endereco || alunoEncontrado.endereco,
            telefone: pegarBody.telefone || alunoEncontrado.telefone,
            cpf: pegarBody.cpf || alunoEncontrado.cpf
        }

        alunos.splice(indice, 1, updateAluno)

        if(alunoEncontrado == undefined) {
            throw new Error("Aluno não encontrado, pois o id não foi identificado.")
        }

        response.status(200).json({
            "mensagem": "Dados do aluno atualizado com sucesso",
            updateAluno
        })
    } catch (error) {
        response.status(500).json({
            message: error.message
        })
        console.log(error)
    }
}

//Deletar cadastrado de um aluno (DELETE)
const excluirAluno = (request, response) => {
    try {
        const pegarId = request.params.id
        const alunoEncontrado = alunos.find(aluno => aluno.alunoId == pegarId)

        const indice = alunos.indexOf(alunoEncontrado)

        alunos.splice(indice, 1)

        if(alunoEncontrado == undefined) {
            throw new Error("Id não encontrado.")
        }

        response.status(200).json({
            "mensagem": "aluno excluido com sucesso."
        })
    } catch (error) {
        response.status(500).json({
            message: error.message
        })
        console.log(error)
    }
}

//Exportar as variaveis do controller
module.exports = {
    todosAlunos,
    buscarPorId,
    buscarPorNome,
    cadastrarAlunos,
    atualizarAlunos,
    excluirAluno,
    buscarPorIdParaOPerfil
}