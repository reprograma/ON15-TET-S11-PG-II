const patientsModel = require("../models/patientModel.json")

const allPatients = (request, response) => {
    response.status(200).json({
        "message": "Esta é a lista de pacientes cadastrados", patientsModel
    })
}

const searchById = (request, response) => {
    try {
        const idRequest = request.params.id
        const findId = patientsModel.find(patient => patient.patientId == idRequest)
        if(!findId){
            throw new Error("Id não encontrado.")
        }
        response.status(200).json(findId)
    } catch (error) {
        response.status(500).json({
            message: error.message
        })
        console.log(error)
    }
}

const searchByName = (request, response) => {
    try {
        const nameRequest = request.query.name.toLowerCase()
        const filterName = patientsModel.filter(patient => {
            if(patient.socialName){
                return patient.socialName.toLowerCase().includes(nameRequest)
            }

            return patient.name.toLowerCase().includes(nameRequest)
        })

        if(filterName.length === 0){
            throw new Error("Nome não encontrado nos registros.")
        }

        response.status(200).json({
            "mensagem": "Paciente encontrado.", filterName
        })
    } catch (error) {
        response.status(500).json({
            message: error.message
        })
        console.error(error)
    }
}

const updatePatient = (request, response) => {
//    const idRequest = request.params.id
    try {
        const updateRequest = request.body
        let newRegistration = {
            "patientId": "",
            "name": updateRequest.name,
            "socialName": updateRequest.socialName,
            "age": updateRequest.age,
            "address": updateRequest.address,
            "phone": updateRequest.phone,
            "cpf": updateRequest.cpf
        }

    } catch (error) {
        response.status(500).json({
            message: error.message
        })
        console.error(error)
    }
}

const newPatient = (request, response) => {
    const newPatientRequest = request.body
    let newRegistration = {
        "patientId": (patientsModel.length)+1,
        "name": newPatientRequest.name,
        "socialName": newPatientRequest.socialName,
        "age": newPatientRequest.age,
        "address": newPatientRequest.address,
        "phone": newPatientRequest.phone,
        "cpf": newPatientRequest.cpf
    }
    
    if(!newPatientRequest.name || newPatientRequest.socialName || newPatientRequest.adress || newPatientRequest.cpf){
        return response.status(400).json({
            message: "É obrigatório inserir o nome do paciente."
        })
    }

    patientsModel.push(newRegistration)
    response.status(201).json({
        message: "Paciente cadastrado com sucesso.", newRegistration
    })
}

const deletePatient = (request, response) => {
    const idRequest = request.params.id
    const filterName = patientsModel.filter(patient => patient.id == idRequest)
    
    if(filterName == undefined){
        response.status(404).json({
            message: "Paciente não registrado no sistema."
        })
    }

    let index = patientsModel.indexOf(filterName)
    patientsModel.splice(index, 1)

    response.status(200).json({
        message: "Cadastro de paciente deletado com sucesso."
    })
}
module.exports = {
    allPatients,
    searchById,
    searchByName,
    updatePatient,
    newPatient,
    deletePatient
}