//importar o json/banco de dados
const pacientes = require("../models/pacienteModel.json")

//Listar todos os pacientes (GET)
const todosPacientes = (request, response) => {
    response.status(200).json({
        "mensagem": "Esses são os pacientes cadastrados em nosso hospital",
        pacientes
    })

}

//Listar pacientes por id (GET)
const buscarPorId = (request, response) => {
    try {
        //identificar o id do parâmetro
        const chamarId = request.params.id
        //comparar id da request com o id do banco de dados/json
        const acharId = pacientes.find(paciente => paciente.pacienteId == chamarId)
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

//Listar pacientes por nome, se tiver nome social, trazer o nome social (GET)
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
            throw new Error("Nome não encontrado")
        }

        response.status(200).json({
            "mensagem": "Paciente encontrado",
            encontrarNome
        })
    
    } catch (error) {
        response.status(500).json({
            message: error.message
        })
    }
}

//Cadastrar paciente (POST)

//Atualizar cadastro de um paciente (PUT)

//Deletar cadastrado de um paciente (DELETE)

//Exportar as variaveis do controller
module.exports = {
    todosPacientes,
    buscarPorId,
    buscarPorNome
}