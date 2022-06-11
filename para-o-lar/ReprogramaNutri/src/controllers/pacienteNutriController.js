const pacientesNutri = require("../models/pacienteNutri.json")

// LISTA TODOS OS PACIENTES

const getAll = (request, response) => {

    try {
        response.status(200).json({ 
            "mensagem": "Esses são os pacientes cadastrados em nosso Sistema:", pacientesNutri });
   }

       catch (error) {
        response.status(500).json({ 
            error: "Não foi possível exibir a lista de pacientes. Por favor, tente novamente mais tarde" });
}};

// BUSCA PACIENTES POR ID

const getById = (request, response) => {
    
    try {
        
        const idRequest = request.params.id

        const pacienteEncontrado = pacientesNutri.find(paciente => paciente.id == idRequest);


        if (pacienteEncontrado == undefined) throw new Error("Não foi possível encontrar paciente: ID não encontrado");
        response.status(200).json({ "Paciente Encontrado": pacienteEncontrado });

    }

    catch (error) {
        response.status(500).json({ message: error.message });
    }

};

// BUSCAR PACIENTE PELO NOME

const getByName = (request, response) => {

    try {
        
        const nameRequest = request.querynome.toLowerCase();

        const pacienteEncontrado = pacientesNutri.filter(paciente => { if(pacientesNutri.nomeSocial) {
            return paciente.nomeSocial.toLowerCase().includes(nameRequest)
        }

       return paciente.nome.toLowerCase().includes(nameRequest)

    })
        if (pacienteEncontrado == 0) throw new Error("Não foi possível encontrar pacientes com o nome pesquisado.");
        response.status(200).json({ "Paciente(s) encontrado(s)": pacienteEncontrado });

    }
    catch (error) {
        response.status(500).json({ message: error.message });


    }

};

// CADASTRAR NOVO PACIENTE

const createPatient = (request, response) => {

    try {

        const bodyRequest = request.body

        let newPatient = {

            pacienteId: (pacientesNutri.length) + 1,
            nome: bodyRequest.nome,
            nomeSocial: bodyRequest.nomeSocial,
            idade: bodyRequest.idade,
            altura: bodyRequest.altura,
            pesoInicial: bodyRequest.pesoInicial,
            atividadeFísica: bodyRequest.atividadeFísica,
            patologias: bodyRequest.patologias,
            endereco: bodyRequest.endereco,
            telefone: bodyRequest.telefone,
            cpf: bodyRequest.cpf,
            email: bodyRequest.email
}


        pacientesNutri.push(newPatient)

        response.status(201).json({
            "mensagem": "Paciente cadastrado com sucesso!",
            newPatient
        })

    } catch (error) {
        response.status(500).json({

            message: error.message
        })
        console.log(error)
    }
}

// ATUALIZAR CADASTRO DE UM PACIENTE

const updatePatient = (request, response) => {

    try {

        const idRequest = request.params.id
        const bodyRequest = request.body


        const pacienteEncontrado = pacientesNutri.find(paciente => paciente.pacienteId == idRequest)

        const indice = pacientesNutri.indexOf(pacienteEncontrado)
       
        bodyRequest.pacienteId == idRequest

        pacientesNutri.splice(indice, 1, bodyRequest)

        if(pacienteEncontrado == undefined) {
            throw new Error("Paciente não encontrado, pois o id não foi identificado.")
        }

        response.status(200).json({
            "mensagem": "Dados do paciente atualizado com sucesso",
            bodyRequest
        })
    } catch (error) {
        response.status(500).json({
            message: error.message
        })
        console.log(error)
    }
}


// DELETAR CADASTRO PACIENTE 

const deletePatient = (request, response) => {

    try {

        const idRequest = request.params.id

        const pacienteEncontrado = pacientesNutri.find(paciente => paciente.pacienteId == idRequest)

        const indice = pacientes.indexOf(pacienteEncontrado)

        pacientesNutri.splice(indice, 1)

        if(pacienteEncontrado == undefined) {

            throw new Error("Id não encontrado.")
        }

        response.status(200).json({
            "mensagem": "Paciente excluido com sucesso."
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
    getByName,
    createPatient,
    updatePatient,
    deletePatient
  
}