//qui fica nossa logica
//onde estarao todas as ações/verbos
//importar o json ou banco de dados
//precisamos listar os pacientes do hospital(GET)
//precisamos listar por ID
//precisamos listar por nome, nome social e id
// cadastrar novo cliente(POST)
//atualizar o cadastro do cliente no sistema(PUT)
//deletar um cadastro (DELETE)
//exportar as variaveis do controller

const pacientes = require('../models/pacientesModel.json')
const todosPacientes = (request, response) => {
    response.status(200).json({
        "mensagem": "Esses são todos os pacientes cadastrados em nosso hospital de  códigos",
        pacientes

    })
}
const buscarPorId = (request, response) => {
    try {
        //identificar o id por parametros
        const chamarId = request.params.pacienteId
            //entrando no banco de dados e encontrando o id no banco e comparando com o id digitado
        const acharId = pacientes.find(paciente => paciente.pacienteId == chamarId)
        if (!acharId) {
            throw new Error("Id não encontrado.")
        }
        response.status(200).json(acharId)
    } catch (error) {
        response.status(500).json({
            "message": error.message
        })
        console.log(error)
    }
}

module.exports = {
    todosPacientes,
    buscarPorId,
}