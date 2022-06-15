const desabrigadosModel = require("../models/desabrigados.json")
const abrigosModel = require("../models/abrigos.json")

const listarTodos = (request, response) => {
    response.status(200).json({
        "message": "Esta lista contém todos os desabrigados cadastrados", desabrigadosModel
    })
}

const buscarId = (request, response) => {
    try {
        const idRequest = request.params.id
        const idEncontrada = desabrigadosModel.find(usuario => usuario.idUsuario == idRequest)
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

const buscarNome = (request, response) => {
    try {
        const nomeRequest = request.query.nome.toLowerCase()
        const filtrarNome= desabrigadosModel.filter(usuario => {
            if(usuario.nomeSocial){
                return usuario.nomeSocial.toLowerCase().includes(nomeRequest)
            }

            return usuario.nomeUsuario.toLowerCase().includes(nomeRequest)
        })

        if(filtrarNome.length === 0){
            throw new Error("Nome não encontrado nos registros.")
        }

        response.status(200).json({
            "mensagem": "Usuário encontrado: ", filtrarNome
        })
    } catch (error) {
        response.status(500).json({
            message: error.message
        })
        console.error(error)
    }
}

const buscarBairro = (request, response) => {
    try {
        const bairroRequest = request.query.bairro.toLocaleLowerCase()
        const filtrarBairro = desabrigadosModel.filter(usuario => usuario.bairro.toLocaleLowerCase().includes(bairroRequest))
        
        if(!filtrarBairro){
            throw new Error ("Bairro não encontrado.")
        }
        response.status(200).json({
            "mensagem": `Usuários que residem no bairro ${bairroRequest}: `, filtrarBairro
        })
    } catch (error) {
        response.status(500).json({
            message: error.message
        })
        console.error(error)
    }
}

const atualizarCadastro = (request, response) => {
    try {
        const { nomeUsuario, nomeSocial, cpf, genero, endereco, bairro, familia } = request.body
        const idRequest = request.params.id
        const usuarioEncontrado = desabrigadosModel.find(usuario => usuario.idUsuario == idRequest)
        const indice = desabrigadosModel.indexOf(usuarioEncontrado)

        if (usuarioEncontrado){
            usuarioEncontrado.nomeUsuario = nomeUsuario || usuarioEncontrado.nomeUsuario
            usuarioEncontrado.nomeSocial = nomeSocial || usuarioEncontrado.nomeSocial
            usuarioEncontrado.cpf = cpf || usuarioEncontrado.cpf
            usuarioEncontrado.genero = genero || usuarioEncontrado.genero
            usuarioEncontrado.endereco = endereco || usuarioEncontrado.endereco
            usuarioEncontrado.bairro = bairro || usuarioEncontrado.bairro
            usuarioEncontrado.familia = familia || usuarioEncontrado.familia
        }

        desabrigadosModel.splice(indice, 1, usuarioEncontrado)

        if(usuarioEncontrado == undefined){
            throw new Error("Nenhum usuário foi encontrado com esse id.")
        }

        response.status(200).json({
            "mensagem": `Dados do usuário ${idRequest} alterados com sucesso.`,
            usuarioEncontrado
        })
    } catch (error) {
        response.status(500).json({
            message: error.message
        })
        console.error(error)
    }
}

const novoCadastro = (request, response) => {
    const novoCadastroRequest = request.body
    let novoRegistro = {
        idUsuario: (desabrigadosModel.length) +1,
        nomeUsuario: novoCadastroRequest.nomeUsuario,
        nomeSocial: novoCadastroRequest.nomeSocial,
        cpf: novoCadastroRequest.cpf,
        genero: novoCadastroRequest.genero,
        endereco: novoCadastroRequest.endereco,
        bairro: novoCadastroRequest.bairro,
        familia: [novoCadastroRequest.familia]
    }
    
    if(!novoRegistro.nomeUsuario || novoRegistro.nomeSocial || novoRegistro.cpf){
        return response.status(400).json({
            message: "É obrigatório inserir nome ou cpf para realizar o cadastro."
        })
    }

    if(novoRegistro.nomeUsuario === null || novoRegistro.nomeUsuario === undefined || novoRegistro.nomeUsuario.trim() === ""){
        return response.status(406).json({
            message: "É obrigatório inserir um Nome para o usuário."
        })
    }

    desabrigadosModel.push(novoRegistro)
    response.status(201).json({
        message: "Usuário cadastrado com sucesso.", novoRegistro
    })
}

const deletarCadastro = (request, response) => {
    const idRequest = request.params.id
    const idEncontrada = desabrigadosModel.find(usuario => usuario.idUsuario == idRequest)
    
    if(idEncontrada == undefined){
        response.status(404).json({
            message: "Usuário não registrado no sistema."
        })
    }

    let index = desabrigadosModel.indexOf(idEncontrada)
    desabrigadosModel.splice(index, 1)

    response.status(200).json({
        message: "Cadastro do usuário deletado com sucesso."
    })
}

module.exports = {
    listarTodos,
    buscarId,
    buscarNome,
    buscarBairro,
    atualizarCadastro,
    novoCadastro,
    deletarCadastro, 
}