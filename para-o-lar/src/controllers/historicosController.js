const alunosModel = require("../models/cadastros.json");
const historicoModel = require("../models/historicos.json");


const getAllRecordsByStudentId = (request, response) => {
    const { id } = request.params
    try {
        let registers = alunosModel
        let records = historicoModel

        const filterRegisters = registers.filter(register => register.id == id)
        const filterRecords = records.filter(record => record.aluno == id)

        if (filterRegisters.length === 0 || filterRecords === 0) {
            throw {
                statusCode: 404,
                message: "Não encontramos resultados com essa busca.",
                details: "Em nosso banco de dados, não existem informações compatíveis com essa busca.",
                params: id
            }
        }

        response.status(200).json({
            "cadastro": filterRegisters,
            "históricos": filterRecords

        })

    } catch (error) {
        console.error(error)
        console.log("Busca: ", request.params)
        if (error.statusCode) {
            response.status(error.statusCode).json(error)
        } else {
            response.status(500).json({ message: error.message })
        }
    }
}

const getAllRecordsByRecordId = (request, response) => {
    const { id } = request.params
    try {


        for (let i = 0; i < alunosModel.length; i++) {
            let alunoID = alunosModel[i].id
            let cadastro = alunosModel[i]

            for (let j = 0; j < historicoModel.length; j++) {
                if (historicoModel[j].aluno == alunoID) {
                    historicoModel[j].aluno = cadastro

                }

            }

        }

        let records = historicoModel

        const filterRecords = records.find(record => record.id == id)

   if (filterRecords == undefined) {
            throw {
                statusCode: 404,
                message: "Não encontramos resultados com essa busca.",
                details: "Em nosso banco de dados, não existem informações compatíveis com essa busca.",
                params : id
            }
        }

        response.status(200).json({
            "histórico Encontrado": filterRecords

        })

    } catch (error) {
        console.error(error)
        console.log("Busca: ", request.params)
        if (error.statusCode) {
            response.status(error.statusCode).json(error)
        } else {
            response.status(500).json({ message: error.message })
        }
    }
}

const getAllRecords = (request, response) => {
    const { name = null, recordId = null, registerId = null, month = null } = request.query
    try {
        for (let i = 0; i < alunosModel.length; i++) {
            let alunoID = alunosModel[i].id
            let cadastro = alunosModel[i]

            for (let j = 0; j < historicoModel.length; j++) {
                if (historicoModel[j].aluno == alunoID) {
                    historicoModel[j].aluno = cadastro

                }

            }

        }
        let records = historicoModel

        if (name) {
            records = records.filter(record => {
                if (!record.aluno.nomeSocial.trim() == "") {
                    return record.aluno.nomeSocial.toLocaleLowerCase().includes(name.toLocaleLowerCase())
                }
                if (!record.aluno.nomeAfetivo.trim() == "") {
                    return record.aluno.nomeAfetivo.toLocaleLowerCase().includes(name.toLocaleLowerCase())
                } else {
                    return record.aluno.nome.toLocaleLowerCase().includes(name.toLocaleLowerCase())
                }
            })
        }

        if (recordId) {
            records = records.find(record => record.id == recordId)
        }

        if (registerId) {
            records = records.filter(record => record.aluno.id == registerId)
        }
        if (month) {
            records = records.filter(record => record.mes.toLocaleLowerCase().includes(month.toLocaleLowerCase()))
        }

        if (records == 0 || records == undefined) {
            throw {
                statusCode: 404,
                message: "Não encontramos resultados com essa busca.",
                details: "Em nosso banco de dados, não existem informações compatíveis com essa busca.",
                query: request.query
            }
        }

        response.status(200).json({
            "Históricos Encontrados": records.length,
            "Históricos": records

        })

    } catch (error) {
        console.error(error)
        console.log("Busca: ", request.params)
        if (error.statusCode) {
            response.status(error.statusCode).json(error)
        } else {
            response.status(500).json({ message: error.message })
        }
    }


}

const findStudentsGradeAverage = (request, response) => {
    const { id } = request.params
    try {

        let grades = []

        for (let i = 0; i < alunosModel.length; i++) {
            let alunoID = alunosModel[i].id
            let cadastro = alunosModel[i]

            for (let j = 0; j < historicoModel.length; j++) {
                if (historicoModel[j].aluno == alunoID) {
                    historicoModel[j].aluno = cadastro

                }

            }

        }

        let records = historicoModel
        for (item of records) {
            let alunoId = item.aluno.id

            if (alunoId == id) {
                grades.push(item.avaliacao)

            }
        }

   
        
        let findName = records.find(record => record.aluno.id == id)

        if (findName == 0 || findName == undefined) {
            throw {
                statusCode: 404,
                message: "Não encontramos resultados com essa busca.",
                details: "Em nosso banco de dados, não existem informações compatíveis com essa busca.",
                params: id
            }
        }
        
        let anyName
        if (findName.aluno.nomeSocial.length != 0) {
            anyName = findName.aluno.nomeSocial
        } else if (findName.aluno.nomeAfetivo.length != 0) {
            anyName = findName.aluno.nomeAfetivo
        } else {
            anyName = findName.aluno.nome
        }
        
        let average = (grades.reduce((prev, next) => prev + next)) / grades.length
        let filterRecords = records.filter(record => record.aluno.id == id)
        
        if (filterRecords == 0 ||filterRecords == undefined) {
            throw {
                statusCode: 404,
                message: "Não encontramos resultados com essa busca.",
                details: "Em nosso banco de dados, não existem informações compatíveis com essa busca.",
                params: id
            }
        }
        
        response.status(200).json({
            "Nome do aluno": anyName,
            "Média do aluno": average.toFixed(2),
            "Notas do aluno": grades,
            "históricos Encontrados": filterRecords
        })

    } catch (error) {
        console.error(error)
        console.log("Busca: ", request.params)
        if (error.statusCode) {
            response.status(error.statusCode).json(error)
        } else {
            response.status(500).json({ message: error.message })
        }
    }
}

const findStudentsFrequency = (request, response) => {
    const { id } = request.params
    const { month } = request.query
    try {
        let presence = []
        let absence = []

        for (let i = 0; i < alunosModel.length; i++) {
            let alunoID = alunosModel[i].id
            let cadastro = alunosModel[i]

            for (let j = 0; j < historicoModel.length; j++) {
                if (historicoModel[j].aluno == alunoID) {
                    historicoModel[j].aluno = cadastro

                }

            }

        }

        let records = historicoModel

        if (month) {

            records = records.filter(record => record.aluno.id == id && record.mes.toLocaleLowerCase().includes(month.toLocaleLowerCase()))
            for (item of records) {
                let frequencia = item.presenca
                for (item of frequencia) {
                    if (item === true) {
                        presence.push(1)

                    } if (item === false) {
                        absence.push(1)
                    }
                    else {
                        absence.push(0),
                            presence.push(0)
                    }


                }

            }

        }

        if (!month) {

            records = records.filter(record => record.aluno.id == id)
            for (item of records) {
                let frequencia = item.presenca
                for (item of frequencia) {
                    if (item === true) {
                        presence.push(1)

                    } if (item === false) {
                        absence.push(1)
                    }
                    else {
                        absence.push(0),
                            presence.push(0)
                    }


                }

            }

        }


        let findName = records.find(record => record.aluno.id == id)
        let filterRecords = records.filter(record => record.aluno.id == id)

        if (findName == undefined || filterRecords == 0) {
            throw {
                statusCode: 404,
                message: "Não encontramos resultados com essa busca.",
                details: "Em nosso banco de dados, não existem informações compatíveis com essa busca.",
                params: id,
                query: request.query
            }
        }

        let anyName
        if (findName.aluno.nomeSocial.length != 0) {
            anyName = findName.aluno.nomeSocial
        } else if (findName.aluno.nomeAfetivo.length != 0) {
            anyName = findName.aluno.nomeAfetivo
        } else {
            anyName = findName.aluno.nome
        }
        let presenca = (presence.reduce((prev, next) => prev + next))
        let falta = (absence.reduce((prev, next) => prev + next))
        

        
     

        response.status(200).json({
            "Nome do aluno": anyName,
            "Presenças do aluno": presenca,
            "Faltas do aluno": falta,
            "históricos Encontrados": filterRecords
        })

    } catch (error) {
        console.error(error)
        console.log("Busca: ", request.params)
        if (error.statusCode) {
            response.status(error.statusCode).json(error)
        } else {
            response.status(500).json({ message: error.message })
        }
    }
}


const createNewRecord = (request, response) => {
    const { mes, aluno, modalidadeDeAula, observacoes, nivel, avaliacao, quantidadeDeAulasMensais, presenca, statusPagamento } = request.body


    try {
        let records = historicoModel

        const id = records.length + 1
    
        
const newRecord = {
    id, mes, aluno, modalidadeDeAula, observacoes, nivel, avaliacao, quantidadeDeAulasMensais, presenca, statusPagamento };

const keys = Object.keys(newRecord)
keys.forEach(key => {
    if (!newRecord[key]) {
        throw {
            statusCode: 406,
            message: `Não foi possível cadastrar histórico: ${id}. Todos os itens devem ser preenchidos.`,
            details: `Para a criação de um novo histórico, é preciso preencher todos os dados.`
        };
    };
});

records.push(newRecord)
response.status(201).json({
    "Mensagem": "Histórico cadastrado com sucesso",
    "Novo histórico": newRecord,
    "Históricos cadastrados": records.length,
    "Lista de históricos": records
});

    } catch (error) {

    console.error(error)
    console.log("Busca: ", request.params)
    if (error.statusCode) {
        response.status(error.statusCode).json(error)
    } else {
        response.status(500).json({ message: error.message })
    }

};
};

const updateAll = (request, response) => {
    const { mes, aluno, modalidadeDeAula, observacoes, nivel, avaliacao, quantidadeDeAulasMensais, presenca, statusPagamento } = request.body


    try {
        const records = historicoModel
        const idRequest = request.params.id
        const bodyRequest = request.body
        const findRecord = records.find(record => record.id == idRequest);


                const indice = records.indexOf(findRecord);

                for (item of records) {
                    const update = {
                        id:idRequest,
                        mes: bodyRequest.mes || item.mes,
                        aluno: bodyRequest.aluno || item.aluno,
                        modalidadeDeAula: bodyRequest.modalidadeDeAula || item.modalidadeDeAula,
                        observacoes: bodyRequest.observacoes || item.observacoes,
                        nivel: bodyRequest.nivel || item.nivel,
                        avaliacao: bodyRequest.avaliacao || item.avaliacao,
                        quantidadeDeAulasMensais: bodyRequest.quantidadeDeAulasMensais || item.quantidadeDeAulasMensais,
                        presenca: bodyRequest.presenca || item.presenca,
                        statusPagamento: bodyRequest.statusPagamento || item.statusPagamento
                        
                  
                    }
                    records.splice(indice, 1, update);

                }
            
            
        

        const updateRecord = {
            mes, aluno, modalidadeDeAula, observacoes, nivel, avaliacao, quantidadeDeAulasMensais, presenca, statusPagamento
    };

    const keys = Object.keys(updateRecord)
    keys.forEach(key => {
        if (!updateRecord[key]) {
            throw {
                statusCode: 406,
                message: `Não foi possível atualizar histórico: ${idRequest}. Todos os itens devem ser preenchidos.`,
                details: `Para atualizar histórico, é preciso preencher todos os dados.`
            };
        };
    });


    if (findRecord == undefined) {
        throw {
            statusCode: 404,
            message: "Não encontramos resultados com essa busca em nossos históricos.",
            details: `Em nosso banco de dados, não existem históricos com o id: ${idRequest}.`,
            params: request.params
        }
    }

    response.status(200).json([{
        "Mensagem": "Histórico atualizado com sucesso",
        "Histórico atualizado": records[idRequest -1],
        "Lista de Históricos": records
    }]);

} catch (error) {
    console.error(error)
    console.log("Busca: ", request.params)
    if (error.statusCode) {
        response.status(error.statusCode).json(error)
    } else {
        response.status(500).json({ message: error.message })
    }
}
}

const deleteById = (request, response) => {
    const { id } = request.params
    try {
        const records = historicoModel;
        const findRecord = records.find(record => record.id == id);

    
                const indice = historicoModel.indexOf(findRecord);
                let historicoRemovido = records.splice(indice, 1);

                if (findRecord == undefined) {
                    throw {
                        statusCode: 404,
                        message: "Não encontramos resultados com essa busca em nossos cadastros.",
                        details: `Em nosso banco de dados, não existem históricos com o id: ${id}.`,
                        params: request.params
                    }
                }
                response.status(200).send({
                    "Mensagem": "Histórico deletado com sucesso",
                    "Histórico deletado": historicoRemovido,
                    "Lista de históricos": records

                });

    } catch (error) {
        console.error(error)
        console.log("Busca: ", request.params)
        if (error.statusCode) {
            response.status(error.statusCode).json(error)
        } else {
            response.status(500).json({ message: error.message })
        }
    }

};

const updateAnyItem = (request, response) => {
    try {
        const records = historicoModel
        const idRequest = request.params.id
        const bodyRequest = request.body

        
        const findRecord = records.find(record => record.id == idRequest);


        if (findRecord == undefined) {
            throw {
                statusCode: 404,
                message: "Não encontramos resultados com essa busca em nossos cadastros.",
                details: `Em nosso banco de dados, não existem históricos com o id: ${idRequest}.`,
                params: request.params
            }
        }

                const itemEncontrado = Object.keys(bodyRequest);

                itemEncontrado.forEach(key => {
                    findRecord[key] = bodyRequest[key];
                });


      
        
        response.status(200).json([{
            "Mensagem": "Histórico atualizado com sucesso",
            "Histórico atualizado": findRecord,
            "Lista de Históricos": records
        }]);

   
    } catch (error) {
        console.error(error)
        console.log("Busca: ", request.params)
        if (error.statusCode) {
            response.status(error.statusCode).json(error)
        } else {
            response.status(500).json({ message: error.message })
        }
    };
};

module.exports = {
    getAllRecordsByStudentId,
    getAllRecordsByRecordId,
    getAllRecords,
    findStudentsGradeAverage,
    findStudentsFrequency,
    createNewRecord,
    updateAll,
    deleteById,
    updateAnyItem

}