const iniciativasModel = require("../models/iniciativasModel.json")

const allIniciativas = (req, res) => {
    res.status(200).json({
        "message": "Essas são todas as iniciativas",
        iniciativasModel
    })
}

const findById = (req, res) => {
    try {
        const getId = req.params.id
        const findId = iniciativasModel.find(iniciativa => iniciativa.id == getId)
        if (!findId) {
            throw new Error ("Id não encontrado.")
        }
        res.status(200).json({
            "message": "Inciativa encontrada com sucesso",
            findId
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
        
    }
}

const findByName = (req, res) => {
    try {
        const getName = req.params.nome
        const findName = iniciativasModel.filter(iniciativa => iniciativa.nome == getName)
        if (!findName) {
            throw new Error ("Nome não encontrado.")
        }
        res.status(200).json({
            "message": "Iniciativa encontrada",
            findName
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const createIniciativa = (req, res) => {
    try {
        const bodyRequest = req.body

        let newIniciativa = {
            id: (iniciativasModel.length)+1,
            nome: bodyRequest.nome,
            temas: bodyRequest.temas,
            site: bodyRequest.site,
            descricao: bodyRequest.descricao
        }

        iniciativasModel.push(newIniciativa)

        res.status(201).send({
            "message": "Iniciativa cadastrada com sucesso",
            newIniciativa
        })
        
    } catch (error) {
        response.status(500).json({
            message: error.message
        })
    }
}








module.exports = {
    allIniciativas,
    findById,
    findByName,
    createIniciativa
}