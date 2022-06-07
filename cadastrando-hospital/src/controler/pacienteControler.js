// Aqui fica nossa lógica do código (tudo o que o código pode fazer)
// Importar o json/banco de dados
const { response } = require("../app")
const app = require("../app")
const pacientesModel = require("../models/pacienteModel.json")
// Precisamos listar os pacientes desse hospital (GET)
const todosPacientes = (requeste,  response) => {
    response.status(200).json({
        "mensagem": "Esses são os pacientes cadastrados em nosso hospital do código:",
        pacientes
    })
}
const buscarPorId = (requeste, response) => {
    try {
        // identificar o id do parametro
        const chamarId = request.params.chamarId
        // entrando no banco de dados achando o id no banco de dados e comparando com o id digitado
        const acharId = pacientes.find(paciente => paciente.Id == chamarId)
        if(!acharId) {
            throw new Error("Id não encontrado")
        }
        response.status(200).json(acharId)
    } catch (error) {
        response.status(500).json({
            message: error.messege
        })
        console.log(error) 

        }
    }
// Precisamos listar por nome, nome social e id (GET)

const buscarPorNome = (request, response) => {
    try{
        cont trazerNome = request.query.nome.toLowerCase()
        const encontrarNome = pacientes.filter(paciente =>  {
            if(paciente.nomeSocial) {
                return paciente.nomeSocial.toLowerCase()includes(trazerNome)) {
            }
        
           return paciente.nome.toLowerCase().includes(trazerNome))
            
        })

        if(!encontrarNome)
        throw new Error("Nome não encontrado")

    }

    response.status(200).json({
        "mensagem: "Paciente encontrado"

    })
    } catch (error) {
        response.status(500).json({
            message: error.messege
        })
        console.log(error) 

        }
    

// Cadastrar no sistma um paciente (POST)
// Atualizar cadastro (PUT)
// Deletar o cadastro de um paciente (DELETE)
// Exportar as variaveis do controller
module.export = {
    todosPacientes
    buscarPorId
    buscarPorNome
}