// Aqui fica nossa lógica do código
// importar o json/banco de dados
const pacientes = require("../models/pacienteModel.json")
// Precisamos listar os pacientes desse hospital (GET)
const todosPacientes = (request, response) => {
    response.status(200).json({
        "mensagem": "Esses são os pacientes cadastrados em nosso hospital do código:",
        pacientes
    })
}
// Precisamos listar por id (GET)
const buscarPorId = (request, response) => {
    try {
        // identificar o id do parametro
        const chamarId = request.params.id
        // entrando no banco de dados achando o id no banco e comparando com o id digitado
        const acharId = pacientes.find(paciente => paciente.pacienteId == chamarId)
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
// Precisamos listar por nome, se tiver nome social, trazer o nome social (GET)
const buscarPorNome = (request, response) => {
    try {
        const trazerNome = request.query.nome.toLowerCase()
        const encontrarNome = pacientes.filter(paciente => {
            if(paciente.nomeSocial) {
                return paciente.nomeSocial.toLowerCase().includes(trazerNome)
            }

           return paciente.nome.toLowerCase().includes(trazerNome)
        })

        if(encontrarNome.length == 0) {
            throw new Error("Nome não encontrado.")
        }

        response.status(200).json({
            "mensagem": "Paciente encontrado:",
            encontrarNome
        })
    } catch (error) {
        response.status(500).json({
            message: error.message
        })
        console.log(error)
    }
}
// Cadastrar no sistema um paciente (POST)
const cadastrarPacientes = (request, response) => {
    try {
        const pegarBody = request.body
        let novoPaciente = {
            pacienteId: (pacientes.length) + 1,
            nome: pegarBody.nome,
            nomeSocial: pegarBody.nomeSocial,
            idade: pegarBody.idade,
            endereco: pegarBody.endereco,
            telefone: pegarBody.telefone,
            cpf: pegarBody.cpf
        }

        pacientes.push(novoPaciente)

        response.status(201).json({
            "mensagem": "Paciente cadastrado com sucesso!",
            novoPaciente
        })
    } catch (error) {
        response.status(500).json({
            message: error.message
        })
        console.log(error)
    }
}
// Atualizar o cadastro de um paciente no sistema (PUT)
const atualizarPacientes = (request, response) => {
    try {
        const pegarId = request.params.id
        const pegarBody = request.body


        const pacienteEncontrado = pacientes.find(paciente => paciente.pacienteId == pegarId)

        const indice = pacientes.indexOf(pacienteEncontrado)
       
        pegarBody.pacienteId == pegarId

        pacientes.splice(indice, 1, pegarBody)

        if(pacienteEncontrado == undefined) {
            throw new Error("Paciente não encontrado, pois o id não foi identificado.")
        }

        response.status(200).json({
            "mensagem": "Dados do paciente atualizado com sucesso",
            pegarBody
        })
    } catch (error) {
        response.status(500).json({
            message: error.message
        })
        console.log(error)
    }
}
// Deletar o cadastro de um paciente (DELETE)
const excluirPaciente = (request, response) => {
    try {
        const pegarId = request.params.id
        const pacienteEncontrado = pacientes.find(paciente => paciente.pacienteId == pegarId)

        const indice = pacientes.indexOf(pacienteEncontrado)

        pacientes.splice(indice, 1)

        if(pacienteEncontrado == undefined) {
            throw new Error("Id não encontrado.")
        }

        response.status(200).json({
            "mensagem": "Paciente excluido com sucesso."
        })
    } catch (error) {
        response.status(500).json({
            message: error.message
        })
        console.log(error)
    }
}
// Exportar as variaveis do controller
module.exports = {
    todosPacientes,
    buscarPorId,
    buscarPorNome,
    cadastrarPacientes,
    atualizarPacientes,
    excluirPaciente
}
