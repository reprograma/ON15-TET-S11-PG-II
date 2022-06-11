// Aqui fica a lógica
// importar o alunoModel pra cá, que seria o banco de dados.
const { json } = require("express")
const alunos = require("../models/alunoModel.json")
// listar os nomes dos alunos. (GET)
const totalAlunos = (request,response) => {
    response.status(200).json({
        "mensagem": "listagem de alunos da Faculdade.",
        alunos
    })
}
// listar por id (GET)   //funcionando
const buscarPorId = (request, response) => {
    try {
        const chamarID = request.params.id 
        const acharId = alunos.find(aluno => aluno.id == chamarID)
        if(!acharId) {
            throw new Error ("ID NÃO ENCONTRADO.")
        }
        response.status(200).json(acharId)

    } catch (error) {
        response.status(500).json({
            message: error.message
        })
        console.log(error)
    }
}
// listar por matricula (GET)   
const buscarPorMatricula = (request, response) => {
    try {
        const chamarMatricula = request.query.matricula
        const acharMatricula = alunos.filter(matriculla => {
           return matriculla.matricula == chamarMatricula
        })
        
        if(acharMatricula.length == 0) {
            throw new Error ("MATRICULA NÃO ENCONTRADA.")
        }
         return response.status(200).json(acharMatricula)

    } catch (error) {
        response.status(500).json({
            message: error.message
        })
        console.log(error)
    }
}


// listar por CPF (GET)     
const buscarPorCPF = (request, response) => {
    try {
        const chamarCPF = request.query.cpf
        const acharCPF = alunos.find(pessoaFisica => pessoaFisica.CPF == chamarCPF)
        if(!acharCPF) {
            throw new Error ("NÚMERO DE CPF NÃO ENCONTRADO.")
        }
        response.status(200).json(acharCPF)
    } catch (error) {
        response.status(500).json({
            message: error.message
        })
        console.log(error)
    }
}
// listar por nomesocial (GET)  
const buscarPorNomeSocial = (request, response) => {
    try {
        const chamarNomeSocial = request.query.nome
        const acharNomeSocial = alunos.filter(Social => {
            if(Social.nomeSocial) {
                return Social.nomeSocial.toLowerCase().includes(chamarNomeSocial)
            }

            return Social.nome.toLowerCase().includes(chamarNomeSocial)
        })
        if(acharNomeSocial.length == 0) {
            throw new Error ("NOME NÃO ENCONTRADO.")
        }
        response.status(200).json({
            "mensagem": "Encontrado",
            acharNomeSocial
        })
    } catch (error) {
        response.status(500).json({
            message: error.message
        })
        console.log(error)
    }
}

// cadastrar no sistema novos alunos.  (POST)
const cadastrarAlunos = (request, response) => {
    try {
        const pegarBody = request.body 
        const alunoNovo = {
            id: (alunos.length) +1,
            faculdade: pegarBody.faculdade,
            curso: pegarBody.curso,
            turno: pegarBody.turno,
            matricula: pegarBody.matricula,
            nome: pegarBody.nome,
            nomeSocial: pegarBody.nomeSocial,
            idade: pegarBody.idade,
            CPF: pegarBody.CPF,
            endereço: pegarBody.endereço,
            telefone: pegarBody.telefone
        }

        alunos.push(alunoNovo)

        response.status(201).json({
            "mensagem": "ALUNO CADASTRADO COM SUCESSO",
            alunoNovo
        })
    } catch (error) {
        response.status(500).json({
            message: error.message
        })
        console.log(error)
    }
}

// atualizar cadastro do aluno. (PUT)
const atualizarAlunos = (request, response) => {
    try {
        const pegarId = request.params.id
        const pegarBody = request.body 

        const alunoEncontrado = alunos.find(aluno => alunos.id == pegarId)

        const indice = alunos.indexOf(alunoEncontrado)
        pegarBody.id == pegarId
        alunos.splice(indice, 1, pegarBody)

        if(alunoEncontrado == undefined) {
            throw new Error ("ALUNO NÃO ENCONTRADO, POIS O ID NÃO FOI IDENTIFICADO.")
        }
        response.status(200);json({
            "mensagem": "Dados do aluno atualizados.",
            pegarBody
        })
    } catch (error) {
        response.status(500).json({
            message: error.message
        })
        console.log(error)
    }
}
// Excluir aluno do sistema. (DELETE)
const excluirAlunos = (request, response) => {
    try {
        const pegarId = request.params.id
        const alunoEncontrado = alunos.find(aluno => aluno.id == pegarId)

        const indice = alunos.indexOf(alunoEncontrado)

        alunos.splice(indice, 1)
        if(alunoEncontrado == undefined) {
            throw new Error (" ID NÃO ENCONTRADO.")
        }
        response.status(200).json({
            "mensagem": "Aluno excluido com sucesso."

        })

    } catch (error) {
        
    }
}



// exportar as variáveis (EXPORT)
module.exports = {
    totalAlunos,
    buscarPorId,
    buscarPorCPF,
    buscarPorMatricula,
    buscarPorNomeSocial,
    cadastrarAlunos,
    atualizarAlunos,
    excluirAlunos
}