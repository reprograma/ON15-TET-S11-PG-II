const iniciativasModel = require("../models/iniciativasModel.json")
const acoesModel = require("../models/acoesModel.json")

const getAll = (req, res) => {
    for (let i = 0; i < iniciativasModel.length; i++) {
                let ongID = iniciativasModel[i].id
                let cadastro = iniciativasModel[i]
    
                for (let j = 0; j < acoesModel.length; j++) {
                    if (acoesModel[j].ongId == ongID) {
                        acoesModel[j].ongId = cadastro
    
                    }
    
                }
    }
    
    res.status(200).json(acoesModel)
}

const getByAcoes = (req, res) =>{ 
    try {
        const getAcoes = req.query.acoes.toLocaleLowerCase()
        const findAcoes = acoesModel.filter(acoes => acoes.acoes 
            .toString()
            .toLocaleLowerCase()
            .includes(getAcoes)
            )

    if (findAcoes.length == 0) {
        throw new Error ("Ações não encontradas.")
    }
    
    res.status(200).json({
        "message": "Ações encontradas",
        findAcoes
    })
        
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


const getByObservacoes = (req, res) =>{ 
    try {
        const getObservacoes = req.query.observacoes.toLocaleLowerCase()
        const findObservacoes = acoesModel.filter(observacoes => observacoes.observacoes 
            .toString()
            .toLocaleLowerCase()
            .includes(getObservacoes)
            )

    if (findObservacoes.length == 0) {
        throw new Error ("Observações não encontradas.")
    }
    
    res.status(200).json({
        "message": "Observações encontradas",
        findObservacoes
    })
        
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const createAcao = (req, res) => {
    try {
        const bodyRequest = req.body

        let newAcao = {
            id: (acoesModel.length)+1,
            acoes: bodyRequest.acoes,
            descricao: bodyRequest.descricao,
        }

        acoesModel.push(newAcao)

        res.status(201).send({
            "message": "Ação cadastrada com sucesso",
            newAcao
        })
        
    } catch (error) {
        response.status(500).json({
            message: error.message
        })
    }
}


const updateAcao = (req, res) =>{
    try {
        const getId = req.params.id
        const getBody = req.body

        const findAcao = acoesModel.find(acoes => acoes.id ==getId)

        const index = acoesModel.indexOf(findAcao)
        getBody.id == getId

         acoesModel.splice(index, 1, getBody)
        
         if (findAcao == undefined) {
             throw new Error ("Ação não encontrada, id não identificado.")
         }
         res.status(200).json({
             "message": "Ação atualizada com sucesso",
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
    const findAcao = acoesModel.find(acoes => acoes.id == getId);
    const indice = acoesModel.indexOf(findAcao)
    let acoesDeleted = acoesModel.splice(indice, 1)

    if (getId == undefined) throw new Error (`Não foi possível deletar ação com o id ${getId}`);
    res.status(200).json({
        "message": "Ação deletada com sucesso",
        "Ação deletada": acoesDeleted,
    });
    } catch (error) {
        res.status(404).json({
            "message": "Iniciativa não existe."
        })
    }
}

module.exports = {
    getAll,
    getByAcoes,
    getByObservacoes,
    createAcao,
    updateAcao,
    deleteById
}