const empregos = require('../models/empregosModels.json')

const todasVagasEmpregos = (request, response) => {
    response.status(200).json({
        "mensagem": "Essess são todos as vagas de emprego que temos disponivel  em nossa Agencia de Empregos",
        empregos
    })
}
const buscarPorId = (request, response) => {
    try {
        const chamarId = request.params.empregoId
        const acharId = empregos.find(emprego => emprego.empregoId == chamarId)
        if (!acharId) {
            throw new Error("Id não encontrada.")
        }
        response.status(200).json(acharId)

    } catch (error) {
        response.status(500).json({
            "message": error.message
        })
        console.log(error)
    }
}
const buscarPorVaga = (request, response) => {
    try {
        const trazerVaga = request.query.vagaemprego.toLowerCase()
        const encontrarVaga = vagaemprego.filter(vaga => {
            if (vaga.vagaemprego) {
                return vaga.toLowerCase().includes(trazerVaga)
            }

            return vaga.vagaemprego.toLowerCase().includes(trazerVaga)
        })

        if (encontrarVaga.length == 0) {
            throw new Error("vaga de emprego não encontrado.")
        }
        response.status(200).json({
            "mensagem": "Vaga de emprego  encontrado:",
            encontrarVaga
        })
    } catch (error) {
        response.status(500).json({
            message: error.message
        })
        console.log(error)
    }
}
module.exports = {
    todasVagasEmpregos,
    buscarPorId,
    buscarPorVaga
}