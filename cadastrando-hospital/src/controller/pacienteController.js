// Aqui fica nossa lógica do código
// Importar o json/banco de dados
const pacientes = require("../models/pacienteModel.json")
// Precisamos listar os pacientes desse hospital (GET)
const todosPacientes = (request, response) => {
    response.status(200).json({
        "mensagem": "Esses são os pacientes cadastrados em nosso hospital",
        pacientes
    })
}
// Precisamos listar por nome, nome social e id (GET)
// Cadastrar no sistema um paciente (POST)
// Atualizar o cadastro de um paciente nos istema (PUT)
// Deletar o cadastro de um paciente (DELETE)
// Exportar as variáveis do controller
module.exports = {
    todosPacientes,
}