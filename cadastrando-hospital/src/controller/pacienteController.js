// Aqui fica nossa logica do codigo

// importar o json /banco de dados


const { response } = require("../app")
const pacientesModel = require("../models/pacienteModel.json")
//Precisamos listar os pacientes desse hospital (GET)
const todosPacientes = (request, response) => {
    response.status(200).json({
        "mensagem": "Esses sao os pacientes",
        pacientesModel
    })
}
// Precisamos listar por  id(GET)
const buscarPorId = (request, response) =>{
    try {
        //identificar o id do parametro
        const chamarId = request.params.id
        const acharId = pacientesModel.find(paciente => paciente.pacienteId == chamarId)
        if(!acharId){ throw new error("id nao encontrado")
    }
    response.status(200).json(acharId)
    } catch (error) {
       response.status(500).json({
           mensage: error.mensage
           
       })
       console.log(error)
    }
}

//listar por nome, se tiver nome social
const buscarPorNome = (request, response) =>{
    try {
        const trazerNome = request.query.nome.tolowerCase
        const encontrarNome = pacientesModel.filter(paciente => {
        if(paciente.nomeSocial){
            return paciente.nomeSocial.toLowerCase().includes(trazerNome)
        }
           return paciente.nome.toLowerCase().includes(trazerNome)
        })
    
       if(encontrarNome.length == 0){
        throw new error("Nome nao encontrado")

    }

    response.status(200).json({
        "mensagem": "Paciente encontrado",
        encontrarNome
    })

    } catch (error) {
       response.status(500).json({
           menssage: error.menssage
       }) 
       console.log(error)
    }
}
//Cadastrar no sistema um paciente (POST)
// Atualizar o cadastro de um paciente no sistema(PUT)
//Deletar o cadastro de um paciente (DELETE)


//Exportar as variaveis do controller
module.exports = {
    todosPacientes,
    buscarPorId,
    buscarPorNome
}