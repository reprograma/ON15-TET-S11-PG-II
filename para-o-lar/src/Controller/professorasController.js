// Aqui fica nossa logica do codigo

// importar o json /banco de dados


const { response, request } = require("../app")
const professorasModel = require("../models/professorasModel.json")
//Precisamos listar os pacientes desse hospital (GET)
const todasProfessoras = (request, response) => {
    response.status(200).json({
        "mensagem": "As professoras maravilhosas",
        professorasModel
    })
}
// Precisamos listar por  id(GET)
const buscarPorId = (request, response) =>{
    try {
        //identificar o id do parametro
        const chamarId = request.params.id
        const acharId = professorasModel.find(professora => professora.professoraId == chamarId)
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
        const chamarPorNome= request.query.id
        const acharNome = professorasModel.find(professora => professora.professoraId == chamarPorNome)
        if(!acharNome){ throw new error("disciplina nao encontrada")
    }
    response.status(200).json(acharNome)
    } catch (error) {
       response.status(500).json({
           mensage: error.mensage
           
       })
       console.log(error)
    }
}



//Cadastrar no sistema um paciente (POST)
    const cadastrarProfessora = (request, response) =>{
    try{
    const bodyRequest = request.body
    let novaProf ={
      id:(professorasModel.length) + 1,
      nome:bodyRequest.nome,
      nomeSocial:bodyRequest.nomeSocial,
      idade:bodyRequest.idade,
      endereco:bodyRequest.endereco,
      telefone:bodyRequest.telefone,
      disciplina:bodyRequest.disciplina
  }

    professorasModel.push(novaProf)
    response.status(201).send({
        "mensagem": "Professora linda cadastrada com sucesso",
        novaProf
    })
    } catch (error) {
        response.status(500).json({
            mensage: error.mensage
            
        })
        console.log(error)
     }
 }


// Atualizar o cadastro de um paciente no sistema(PUT)
const atualizarProfessora =(requet, response) =>{
    try {
        const pegarId = request.params.id
        const pegarBody = request.body
        const professoraEncontrada = professorasModel.find(professora => professora.professoraId ==pegarId)
        const indice = professora.indexOf(professoraEncontrada)
        pegarBody.professoraId == pegarId
        professorasModel.splice(indice, 1, pegarBody)
        if(professoraEncontrada == undefined){
            throw new Error("id não encontrado")
        }

        response.status(200).json({
            "mensage": "Dados atualizado com sucesso",
            pegarBody
        })
    } catch (error) {
        
    }
}
// Deletar o cadastro de um paciente (DELETE)
const deletarProfessora = (request, response) => {
    try {
        const pegarId = request.params.id
        const professoraEncontrada = professorasModel.find(professoras => professoras.professoraId == pegarId)

        const indice = professoras.indexOf(professoraEncontrada)

        professoras.splice(indice, 1)

        if(professoraEncontrada == undefined) {
            throw new Error("Id não encontrado.")
        }

        response.status(200).json({
            "mensagem": "Professora excluida com sucesso."
        })
    } catch (error) {
        response.status(500).json({
            message: error.message
        })
        console.log(error)
    }
}

//Exportar as variaveis do controller
module.exports = {
    todasProfessoras,
    buscarPorId,
    buscarPorNome,
    cadastrarProfessora,
    atualizarProfessora,
    deletarProfessora
}