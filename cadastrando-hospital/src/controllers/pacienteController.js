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
//Atualizar o cadastro de um paciente no sistema (PUT)
//Deleter o cadastro de um paciente (DELETE)
//Exportar as variáveis do controller

module.exports = {
    todosPacientes,
    buscarPorId,
    buscarPorNome
}
//Fazer as rotas correspondentes no routes