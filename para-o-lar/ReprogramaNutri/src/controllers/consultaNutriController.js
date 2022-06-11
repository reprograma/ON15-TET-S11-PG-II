const consultaNutri = require("../models/consultaNutri.json")

// LISTA ATENDIMENTO

const getAll = (request, response) => {

    try {

        response.status(200).json({ 
            "mensagem": "Esses são os Atendimentos encontrados em nosso Sistema:", consultaNutri });
   }

       catch (error) {

        response.status(500).json({ 

            error: "Não foi possível exibir os atendimentos. Por favor, tente novamente mais tarde" });
}};

// BUSCA ATENDIMENTO POR ID


const getById = (request, response) => {
    
    try {
        
        const idRequest = request.params.id

        const atendimentoEncontrado = consultaNutri.find(atendimento => atendimento.id == idRequest);


        if (atendimentoEncontrado == undefined) throw new Error("Não foi possível encontrar Atendimento: ID não encontrado");
        response.status(200).json({ "Atendimento Encontrado": atendimentoEncontrado });

    }

    catch (error) {
        response.status(500).json({ message: error.message });
    }

};

// CADASTRAR NOVA CONSULTA/Atendimento

const createConsultation = (request, response) => {

    try {

        const bodyRequest = request.body

        let newConsultation = {

            atendimentoId: (consultaNutri.length) + 1,
            pedidoDeExameLaboratorial:bodyRequest.pedidoDeExameLaboratorial,
            retorno: bodyRequest.retorno,
            prescriçãoNutricional: bodyRequest.prescriçãoNutricional,
            desjejum: bodyRequest.desjejum,
            lancheDaManhã: bodyRequest.lancheDaManhã,
            almoço: bodyRequest.almoço,
            lancheDaTarde: bodyRequest.lancheDaTarde,
            jantar: bodyRequest.jantar,
            ceia: bodyRequest.ceia,
            recomendações: bodyRequest.recomendações
        }

        consultaNutri.push(newConsultation)

        response.status(201).json({
            "mensagem": "Nova Consulta cadastrada com sucesso!",
            newConsultation
        })

    } catch (error) {
        response.status(500).json({

            message: error.message
        })
        console.log(error)
    }
}

// ATUALIZAR CONSULTA/ATENDIMENTO DE UM PACIENTE

const updateConsultation = (request, response) => {

    try {

        const idRequest = request.params.id
        const bodyRequest = request.body


        const atendimentoEncontrado = consultaNutri.find(atendimento => atendimento.atendimentoId == idRequest)

        const indice = consultaNutri.indexOf(atendimentoEncontrado)
       
        bodyRequest.atendimentoId == idRequest

        consultaNutri.splice(indice, 1, bodyRequest)

        if(atendimentoEncontrado == undefined) {
            throw new Error("Atendimento não encontrado, pois o id não foi identificado.")
        }

        response.status(200).json({
            "mensagem": "Dados do atendimento atualizado com sucesso",
            bodyRequest
        })
    } catch (error) {
        response.status(500).json({
            message: error.message
        })
        console.log(error)
    }
}


// DELETAR CONSULTA/ATENDIMENTO 

const deleteConsultation = (request, response) => {

    try {

        const idRequest = request.params.id

        const atendimentoEncontrado = consultaNutri.find(atendimento => atendimento.atendimentoId == idRequest)

        const indice = atendimento.indexOf(atendimentoEncontrado)

        consultaNutri.splice(indice, 1)

        if(atendimentoEncontrado == undefined) {

            throw new Error("Id não encontrado.")
        }

        response.status(200).json({
            "mensagem": "Atendimento excluido com sucesso."
        })
    } catch (error) {
        response.status(500).json({
            message: error.message
        })
        console.log(error)
    }
}



// EXPORTAR FUNÇÕES

module.exports = {

    getAll,
    getById,
    createConsultation,
    updateConsultation,
    deleteConsultation
  
}