//qui fica nossa logica
//onde estarao todas as ações/verbos
//importar o json ou banco de dados
//precisamos listar os pacientes do hospital(GET)
//precisamos listar por nome, nome social e id
// cadastrar no vo cliente(POST)
//atualizar o cadastro do cliente no sistema(PUT)
//deletar um cadastro (DELETE)
//exportar as variaveis do controller

const pacientes = require('../models/pacientes.json');
const todosPacientes = (request, response) => {
    response.status(200).json({
        "mensagem": "Esses são todos os pacientes cadastrados em nosso hospital de  códigos",
        pacientesModel

    })
}

module.exports = {
    todosPacientes,

}