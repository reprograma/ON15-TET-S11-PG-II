const feiraModel = require("../models/feiraModel.json");

//GET
const allBusiness = (req, res) => {
    res.status(200).json({
        "mensagem" : "Esses são os negócios cadastrados em nossa feira do código:",
        feiraModel
    })
}

//GET
const findById = (req, res) => {
    const id = req.params.id    
    try {
        const findBusiness = feiraModel.find(business => business.id == id)
        
        if (!findBusiness) throw new Error(`Desculpa, não foi possivel encontrar o negócio com o id: ${id}`)

        res.status(200).json(findBusiness)

    } catch (error) {
        console.error(error)
        res.status(404).json({
            "message": "Poxa, infelizmente ainda não possuimos esse negócio no nosso catálago.",
            "details": error.message
        })
    }
}

//GET
const findByName = (req, res) => {    
    try {
        const nameRequest = req.query.nome.toLowerCase()

        const findName = feiraModel.filter(
            business => business.nome.toLowerCase().includes(nameRequest)
            )

        if(findName.length == 0) {
            throw new Error("Negócio não encontrado.")
        }

        res.status(200).json({
            "message": "Negócio encontrado:",
            findName
        })
    } catch (error) {
        res.status(404).json({
            "message": "Poxa, não conseguimos encontrar um negócio com esse nome em nosso catálogo.",
            "details": error.message
        })
        console.log(error)
    }
}

//GET
const findByCategory = (req, res) => {    
    try {
        const categoryRequest = req.query.categoria.toLowerCase()

        const findCategory = feiraModel.filter(
            business => business.categoria.toLowerCase().includes(categoryRequest)
            )

        if(findCategory.length == 0) {
            throw new Error("Categoria não encontrada.")
        }

        res.status(200).json({
            "message": "Categoria encontrada:",
            findCategory
        })
    } catch (error) {
        res.status(404).json({
            "message": "Poxa, não conseguimos encontrar essa categoria em nosso catálogo.",
            "details": error.message
        })
        console.log(error)
    }
}

//POST
const registerBusiness = (req, res) => {
    try {
        const bodyRequest = req.body
        let newBusiness = {
            id: (feiraModel.length) + 1,
            nome: bodyRequest.nome,
            categoria: bodyRequest.categoria,
            instagram: bodyRequest.instagram
        } 

        feiraModel.push(newBusiness)

        res.status(201).json({
            "mensagem": "Negócio cadastrado com sucesso.",
            newBusiness
        })    
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
        console.log(error)
    }
}

//PUT
const updateBusiness = (req, res) => {
    try {
        const getId = req.params.id
        const getBody = req.body


        const businessFound = feiraModel.find(business => business.id == getId)

        const indice = feiraModel.indexOf(businessFound)
       
        getBody.id == getId

        feiraModel.splice(indice, 1, getBody)

        if(businessFound == undefined) {
            throw new Error("Negócio não encontrado, pois o id não foi identificado.")
        }

        res.status(200).json({
            "mensagem": "Dados do negócio atualizados com sucesso",
            getBody
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
        console.log(error)
    }
}

// Deletar o cadastro de um paciente (DELETE)
const deleteBusiness = (req, res) => {
    try {
        const getId = req.params.id
        const businessFound = feiraModel.find(business => business.id == getId)

        const indice = feiraModel.indexOf(businessFound)

        feiraModel.splice(indice, 1)

        if(businessFound == undefined) {
            throw new Error("Id não encontrado.")
        }

        res.status(200).json({
            "mensagem": "Negócio excluido com sucesso."
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
        console.log(error)
    }
}

module.exports = {
    allBusiness,
    findById,
    findByName,
    findByCategory,
    registerBusiness,
    updateBusiness,
    deleteBusiness
}