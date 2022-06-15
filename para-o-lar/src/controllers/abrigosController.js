const abrigosModel = require("../models/abrigos.json")
const desabrigadosModel = require("../models/desabrigados.json")

const listarTodosAbrigos = (request, response) => {
    response.status(200).json({
        "message": "Esta lista contém todos os desabrigados cadastrados", desabrigadosModel
    })
}

const abrigosOcupantes = (request, response) => {
    try {
        for (let i = 0; i < desabrigadosModel.length; i++){
            let cadastro = desabrigadosModel[i]
                for (let j = 0; j < abrigosModel.length; j++){
                    if(abrigosModel[j].bairro == cadastro.bairro){
                        abrigosModel[j].idAbrigo = cadastro
                    }
                }
        }
        
        response.status(200).json(abrigosModel)
    } catch (error) {
        response.status(500).json({
            message: "Não foi possível retornar os abrigos com seus ocupantes"
        })
    }
}

const buscarId = (request, response) => {
    try {
        const idRequest = request.params.id
        const idEncontrada = abrigosModel.find(abrigo => abrigo.idAbrigo == idRequest)
        if(!idEncontrada){
            throw new Error("Id não encontrado.")
        }
        response.status(200).json(idEncontrada)
    } catch (error) {
        response.status(500).json({
            message: error.message
        })
        console.log(error)
    }
}

const buscarBairro = (request, response) => {
    try {
        const bairroRequest = request.query.bairro.toLocaleLowerCase()
        const filtrarBairro = abrigosModel.filter(abrigo => abrigo.bairro.toLocaleLowerCase().includes(bairroRequest))
        response.status(200).json({
            "mensagem": "Abrigo(s) encontrado(s): ", filtrarBairro
        })
    } catch (error) {
        response.status(500).json({
            message: error.message
        })
        console.error(error)
    }
}

const atualizarAbrigo = (request, response) => {
    try {
        const { tipo, nomeAbrigo, endereco, bairro } = request.body
        const idRequest = request.params.id
        const abrigoEncontrado = abrigosModel.find(abrigo => abrigo.idAbrigo == idRequest)
        const indice = abrigosModel.indexOf(abrigoEncontrado)

        if (abrigoEncontrado){
            abrigoEncontrado.tipo = tipo || abrigoEncontrado.tipo
            abrigoEncontrado.nomeAbrigo = nomeAbrigo || abrigoEncontrado.nomeAbrigo
            abrigoEncontrado.endereco = endereco || abrigoEncontrado.endereco
            abrigoEncontrado.bairro = bairro || abrigoEncontrado.bairro
        }

        abrigosModel.splice(indice, 1, abrigoEncontrado)

        if(abrigoEncontrado == undefined){
            throw new Error("Nenhum abrigo foi encontrado com esse id.")
        }

        response.status(200).json({
            "mensagem": `Dados do abrigo ${idRequest} alterados com sucesso.`,
            abrigoEncontrado
        })
    } catch (error) {
        response.status(500).json({
            message: error.message
        })
        console.error(error)
    }
}

const novoAbrigo = (request, response) => {
    const novoAbrigoRequest = request.body
    let novoRegistro = {
        idAbrigo: (abrigosModel.length) +1,
        tipo: novoAbrigoRequest.tipo,
        nomeAbrigo: novoAbrigoRequest.nomeAbrigo,
        endereco: novoAbrigoRequest.endereco,
        bairro: novoAbrigoRequest.bairro,
    }
    
    if(!novoRegistro.nomeAbrigo){
        return response.status(400).json({
            message: "É obrigatório inserir nome do abrigo para realizar o cadastro."
        })
    }

    if(novoRegistro.nomeAbrigo === null || novoRegistro.nomeAbrigo === undefined || novoRegistro.nomeAbrigo.trim() === ""){
        return response.status(406).json({
            message: "É obrigatório inserir um Nome para o abrigo."
        })
    }

    abrigosModel.push(novoRegistro)
    response.status(201).json({
        message: "Abrigo cadastrado com sucesso.", novoRegistro
    })
}

const deletarCadastro = (request, response) => {
    const idRequest = request.params.id
    const idEncontrada = abrigosModel.find(abrigo => abrigo.idAbrigo == idRequest)
    
    if(idEncontrada == undefined){
        response.status(404).json({
            message: "Abrigo não registrado no sistema."
        })
    }

    let index = abrigosModel.indexOf(idEncontrada)
    abrigosModel.splice(index, 1)

    response.status(200).json({
        message: "Abrigo deletado com sucesso."
    })
}
module.exports = {
    listarTodosAbrigos,
    buscarBairro,
    buscarId,
    abrigosOcupantes,
    atualizarAbrigo,
    novoAbrigo,
    deletarCadastro
}