const iniciativasModel = require("../models/iniciativasModel.json")

const allIniciativas = (req, res) => {
    res.status(200).json({
        "message": "Essas são todas as iniciativas cadastradas:",
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
        return res.status(200).json({
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
   console.log(findByName)
    try {
        const getName = req.query.nome
        const findName = iniciativasModel.filter(iniciativa => iniciativa.nome.toLocaleLowerCase().includes(getName))
            
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


const findByTemas = (req, res) => {
    try {
        const getTemas = req.query.temas.toLocaleLowerCase()
        const findTemas = iniciativasModel.filter(iniciativa => iniciativa.temas
            .toString()
            .toLocaleLowerCase()
            .includes(getTemas))
            
        
        if (findTemas.length == 0) {
            throw new Error ("Tema não encontrado.")
        }

        res.status(200).json({
            "message": "Iniciativas encontradas por temas",
            findTemas
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

const updateIniciativa = (req, res) =>{
    try {
        const getId = req.params.id
        const getBody = req.body

        const findIniciativa = iniciativasModel.find(iniciativa => iniciativa.id ==getId)

        const index = iniciativasModel.indexOf(findIniciativa)
         getBody.id == getId

         iniciativasModel.splice(index, 1, getBody)
        
         if (findIniciativa == undefined) {
             throw new Error ("Iniciativa não encontrada, id não identificado.")
         }
         res.status(200).json({
             "message": "Iniciativa atualizada com sucesso",
             getBody
         })
    } catch (error) {
        response.status(500).json({
            message: error.message
        })
        console.log(error)
    }
}

const deleteById = (req, res) => {
    try {
    const getId = req.params.id
    const findIniciativa = iniciativasModel.find(iniciativa => iniciativa.id == getId);
    const indice = iniciativasModel.indexOf(findIniciativa)
    let iniciativaDeleted = iniciativasModel.splice(indice, 1)

    if (getId == undefined) throw new Error (`Não foi possível deletar iniciativa com o id ${getId}`);
    res.status(200).json({
        "message": "Iniciativa deletada com sucesso",
        "Iniciativa deletada": iniciativaDeleted,
        "Lista atual de iniciativas": iniciativasModel
    });
    } catch (error) {
        res.status(404).json({
            "message": "Iniciativa não existe."
        })
    }
}


module.exports = {
    allIniciativas,
    findById,
    findByName,
    findByTemas,
    createIniciativa,
    updateIniciativa,
    deleteById
}