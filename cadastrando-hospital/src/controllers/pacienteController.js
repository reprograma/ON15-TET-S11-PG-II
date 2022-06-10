// Aqui fica nossa lógica do código, os verbos ficam aqui
// Importar o json/banco de dados
const pacientesModel = require("../models/pacienteModel.json")
// Precisamos listar os pacientes deste hospital (GET)
const todosPacientes = (request, response) => {
    response.status(200).json({
        "mensagem": "Esses são os pacientes cadastrados no hospital do código",
        pacientesModel
    })
}
//Listar por id (GET)
const buscarPorId = (request, response) => {
   try {
         const chamarId = request.params.id
         const acharId = pacientesModel.find(paciente => paciente.pacienteId == chamarId)
         if (!acharId) {
             throw new Error ("Id não encontrado.")
         }

         response.status(200).json({
             "mensagem": "Paciente encontrado com sucesso",
             acharId
         })
   } catch (error) {
       response.status(500).json({
           message: error.message
       })
   }
}
//Listar por nome, se tiver nome social trazer o nome social (GET)
const buscarPorNome = (request, response) =>{
    try {
        const chamarNome = request.query.nome.toLowerCase()
        const acharNome = pacientesModel.filter(paciente => {
            if (paciente.nomeSocial) {
            return paciente.nomeSocial.toLocaleLowerCase().includes(chamarNome)
            }
            return paciente.nome.toLowerCase().includes(chamarNome)
    }) 
    if(acharNome.length == 0) {
        throw new Error("Nome não encontrado")
    }
        response.status(200).json({
            "mensagem": "Paciente encontrado:",
            acharNome
        })
    }catch (error) {
        response.status(500).json({
            message: error.message
        })
    }
}
//Cadastrar um paciente no sistema (POST)
const cadastrarPacientes = (request, response) => {
    try {
        const pegarBody = request.body
        const novoPaciente = {
            pacienteId: (pacientesModel.length)+1,
            nome: pegarBody.nome,
            nomeSocial: pegarBody.nomeSocial,
            idade: pegarBody.idade,
            endereco: pegarBody.endereco,
            telefone: pegarBody.telefone,
            cpf: pegarBody.cpf

        }

        pacientesModel.push(novoPaciente)

        response.status(201).json({
            "mensagem": "Paciente cadastrado com sucesso.",
            novoPaciente

        })
        
    } catch (error) {
        response.status(500).json({
        message: error.message
        })
        console.log(error)
    }
}

//Atualizar o cadastro de um paciente no sistema (PUT)
const atualizarPacientes = (request, response) => {
    try {
        const pegarId = request.params.id
        const pegarBody = request.body

        const pacienteEncontrado = pacientesModel.find(paciente => paciente.pacienteId == pegarId)
        
        const indice = pacientesModel.indexOf(pacienteEncontrado)
        
        pegarBody.pacienteId == pegarId
        
        pacientesModel.splice(indice, 1, pegarBody)
        
        if (pacienteEncontrado == undefined) {
            throw new Error ("Paciente não encontrado, pois o id não foi identificado.")
        }

        response.status(200).json({
            "mensagem": "dados do paciente atualizados com sucesso",
            pegarBody
        })

    } catch (error) {
        response.status(500).json({
            message: error.message
        })
        console.log(error)
    }
}
//Deleter o cadastro de um paciente (DELETE)
const excluirPaciente = (request, response) => {
    try {
        const pegarId = request.params.id
        const pacienteEncontrado = pacientesModel.find(paciente => paciente.pacienteId == pegarId)

        const indice = pacientesModel.indexOf(pacienteEncontrado)

        pacientesModel.splice(indice, 1)

        if (pacienteEncontrado == undefined) {
            throw new Error ("Paciente não encontrado, pois o id não foi identificado.")
        }

        response.status(200).json({
            "mensagem": "Paciente excluído com sucesso."
        })
        
    } catch (error) {
        response.status(500).json({
            message: error.message
        })
        console.log(error)
    }
}
//Exportar as variáveis do controller

module.exports = {
    todosPacientes,
    buscarPorId,
    buscarPorNome,
    cadastrarPacientes,
    atualizarPacientes,
    excluirPaciente
}
//Fazer as rotas correspondentes no routes