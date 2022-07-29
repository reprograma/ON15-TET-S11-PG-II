const alunosModel = require("../models/cadastros.json");
 

const findAllPrivateRegisters = (request, response) => {
    const { name = null, socialName = null, adoptionName = null, anyName = null, days = null} = request.query
    try {
        let privateInfo = alunosModel
        if (privateInfo.length == 0) {
            response.status(200).json({ message: "Ainda não existem alunos cadastrados no nosso sistema." })
        }

        if (days) {
            privateInfo = privateInfo.filter(student => student.dias
                .toString()
                .toLocaleLowerCase()
                .includes(days.toLocaleLowerCase()))

        }

        if (name) {
            privateInfo = privateInfo.filter(student => student.nome
                .toLocaleLowerCase()
                .includes(name.toLocaleLowerCase()))
        }
        if (socialName) {
            privateInfo = privateInfo.filter(student => student.nomeSocial
                .toLocaleLowerCase()
                .includes(socialName.toLocaleLowerCase()))

        } if (adoptionName) {
            privateInfo = privateInfo.filter(student => student.nomeAfetivo
                .toLocaleLowerCase()
                .includes(adoptionName.toLocaleLowerCase()))
        }
        if (anyName) {
            privateInfo = privateInfo.filter(student => student.nomeSocial
                .toLocaleLowerCase()
                .includes(anyName.toLocaleLowerCase())
                || student.nomeAfetivo
                    .toLocaleLowerCase()
                    .includes(anyName.toLocaleLowerCase())
                || student.nome
                    .toLocaleLowerCase()
                    .includes(anyName.toLocaleLowerCase()))

        } if (privateInfo.length === 0) {
            throw {
                statusCode: 404,
                message: "Não encontramos resultados com essa busca.",
                details: "Em nosso banco de dados, não existem informações compatíveis com essa busca.",
                query: request.query
            }
        }


        response.status(200).json({
            "Acesso": request.query,
            "Alunos encontrados": privateInfo.length,
            "Lista de alunos cadastrados": privateInfo
        })

    } catch (error) {
        console.error(error)
        console.log("Busca recebida: ", request.query)
        if (error.statusCode) {
            response.status(error.statusCode).json(error)
        } else {
            response.status(500).json({ message: error.message })
        }
    }
}

const findPrivateRegistersById = (request, response) => {
    const { id } = request.params
    try {

        let privateFilterStudents = alunosModel.slice();
        const findPrivateRegisters = privateFilterStudents.find(record => record.id == id);

        if (!findPrivateRegisters) {
            throw {
                statusCode: 404,
                message: "Não encontramos resultados com essa busca em nossos cadastros.",
                details: `Em nosso banco de dados, não existem cadastros com o id: ${id}.`,
                params: request.params
            }
        }
        response.status(200).json({
            "id": request.params,
            "Cadastro encontrado": findPrivateRegisters
        })


    } catch (error) {

        console.error(error)
        console.log("Id recebida: ", request.params)
        if (error.statusCode) {
            response.status(error.statusCode).json(error)
        } else {
            response.status(500).json({ message: error.message })
        }
    }
}

const findByName = (request, response) => {
    const { name = null, socialName = null, adoptionName = null, anyName = null} = request.query
    try {

        let privateFilterStudents = alunosModel.slice();
        let privateInfo = privateFilterStudents.slice()

        if (privateInfo.length == 0) {
            response.status(200).json({ message: "Ainda não existem alunos cadastrados no nosso sistema." })
        }


                if (name) {
                    privateInfo = privateInfo.filter(student => student.nome
                        .toLocaleLowerCase()
                        .includes(name.toLocaleLowerCase()))
                }
                if (socialName) {
                    privateInfo = privateInfo.filter(student => student.nomeSocial
                        .toLocaleLowerCase()
                        .includes(socialName.toLocaleLowerCase()))

                } if (adoptionName) {
                    privateInfo = privateInfo.filter(student => student.nomeAfetivo
                        .toLocaleLowerCase()
                        .includes(adoptionName.toLocaleLowerCase()))
                }
                if (anyName) {
                    privateInfo = privateInfo.filter(student => student.nomeSocial
                        .toLocaleLowerCase()
                        .includes(anyName.toLocaleLowerCase())
                        || student.nomeAfetivo
                            .toLocaleLowerCase()
                            .includes(anyName.toLocaleLowerCase())
                        || student.nome
                            .toLocaleLowerCase()
                            .includes(anyName.toLocaleLowerCase()))

                } if (privateInfo.length === 0) {
                    throw {
                        statusCode: 404,
                        message: "Não encontramos resultados com essa busca.",
                        details: "Em nosso banco de dados, não existem informações compatíveis com essa busca.",
                        query: request.query
                    }
                }

            response.status(200).json({
                "Acesso": request.query,
                "Alunos encontrados": privateInfo.length,
                "Lista de alunos cadastrados": privateInfo
            })


    } catch (error) {
        console.error(error)
        console.log("Busca recebida: ", request.params)
        if (error.statusCode) {
            response.status(error.statusCode).json(error)
        } else {
            response.status(500).json({ message: error.message })
        }
    }
}

const getClassPriceList = (request, response) => {
    const { name = null} = request.query
    try {
        let privateFilterStudents = alunosModel
        let privateInfo = privateFilterStudents.slice()

        let classPriceList = [];

    
                for (let i = 0;  i < privateInfo.length; i++) {
                    let nomes = privateInfo[i].nome
                    let preco = privateInfo[i].mensalidade


                    if (!name) {
                        classPriceList.push({
                            nome: nomes,
                            nomeSocial: privateInfo[i].nomeSocial,
                            nomeAfetivo: privateInfo[i].nomeAfetivo,
                            mensalidade: preco
                        })
                    }

                    if (name) {
                        if (nomes.toLocaleLowerCase().includes(name.toLocaleLowerCase())) {
                            classPriceList.push({
                                nome: nomes,
                                mensalidade: preco
                            })
                        }
                    }
                }

        if (classPriceList.length === 0) {
            throw {
                statusCode: 404,
                message: "Não encontramos resultados com essa busca.",
                details: "Em nosso banco de dados, não existem informações compatíveis com essa busca.",
                query: request.query
            }
        }

        classPriceList.sort(function (a, b) {
            if (a.mensalidade > b.mensalidade) {
                return 1;
            }
            if (a.mensalidade < b.mensalidade) {
                return -1
            }
            return 0
        })


        response.status(200).json({
            "Acesso": request.query,
            "Alunos encontrados": classPriceList.length,
            "Lista de alunos cadastrados": classPriceList
        })


    } catch (error) {
        console.error(error)
        console.log("Busca recebida: ", request.params)
        if (error.statusCode) {
            response.status(error.statusCode).json(error)
        } else {
            response.status(500).json({ message: error.message })
        }

    }
}

const getCPFList = (request, response) => {
    const { name = null} = request.query
    try {
        let privateFilterStudents = alunosModel
        let privateInfo = privateFilterStudents.slice()

        let CPFList = [];

                for (let i = 0; i < privateInfo.length; i++) {
                    let nomes = privateInfo[i].nome
                    let nomesSocial = privateInfo[i].nomeSocial
                    let nomesAfetivo = privateInfo[i].nomeAfetivo
                    let CPFs = privateInfo[i].CPF


                    if (!name) {
                        CPFList.push({
                            nome: nomes,
                            nomeSocial: nomesSocial,
                            nomeAfetivo: nomesAfetivo,
                            CPF: CPFs
                        })
                    }

                    if (name) {
                        if (nomes.toLocaleLowerCase().includes(name.toLocaleLowerCase())) {
                            CPFList.push({
                                nome: nomes,
                                nomeSocial: nomesSocial,
                                nomeAfetivo: nomesAfetivo,
                                CPF: CPFs
                            })
                        }
                    }
                }
        if (CPFList.length === 0) {
            throw {
                statusCode: 404,
                message: "Não encontramos resultados com essa busca.",
                details: "Em nosso banco de dados, não existem informações compatíveis com essa busca.",
                query: request.query
            }
        }

        response.status(200).json({
            "Acesso": request.query,
            "Alunos encontrados": CPFList.length,
            "Lista de alunos cadastrados": CPFList
        })


    } catch (error) {
        console.error(error)
        console.log("Busca recebida: ", request.params)
        if (error.statusCode) {
            response.status(error.statusCode).json(error)
        } else {
            response.status(500).json({ message: error.message })
        }

    }
}

const createNewRegister = (request, response) => {
    const { nome, nomeSocial, nomeAfetivo, idade, dataNascimento, CPF, endereco, telefone, email, localDeTrabalho, localDeEstudo, dataDeInicio, mensalidade, aulasPorSemana, dias, diaEHorario, linkDaAula } = request.body

    try {
        let privateFilterStudents = alunosModel
        let privateInfo = privateFilterStudents

        const id = privateInfo.length + 1


        if (nome === null || nome === undefined || nome.trim() == "") {
            throw {
                statusCode: 406,
                message: `Não foi possível cadastrar aluno. Nome obrigatório`,
                details: `Para cadastrar novo aluno, um nome deve ser inserido.`
            };
        };

        const findStudentByName = privateInfo
            .find(student => student.nome.toLocaleLowerCase() == nome.toLocaleLowerCase())

        if (findStudentByName &&
            findStudentByName.CPF.toLocaleLowerCase() == CPF.toLocaleLowerCase()) {
            throw {
                statusCode: 409,
                message: `Não foi possível cadastrar aluno com o nome: ${nome}. Aluno já cadastrado.`,
                details: `já existe no sistema um aluno com o nome: ${nome} e CPF: ${CPF}.`
            };
        };


        const newStudent = {
            id, nome, idade, dataNascimento, CPF, endereco, telefone, email, dataDeInicio, mensalidade, aulasPorSemana, dias, diaEHorario, linkDaAula
        };

        const keys = Object.keys(newStudent)
        keys.forEach(key => {
            if (!newStudent[key]) {
                throw {
                    statusCode: 406,
                    message: `Não foi possível cadastrar aluno: ${nome}. Todos os itens devem ser preenchidos.`,
                    details: `Para a criação de um novo cadastro, é preciso preencher todos os dados.`
                };
            };
        });

        privateInfo.push(newStudent)
        response.status(201).json({
            "Mensagem": "Aluno cadastrado com sucesso",
            "Novo aluno": newStudent,
            "Alunos cadastrados": privateInfo.length,
            "Lista de alunos": privateInfo
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
    const { nome, nomeSocial, nomeAfetivo, idade, dataNascimento, CPF, endereco, telefone, email, localDeTrabalho, localDeEstudo, dataDeInicio, mensalidade, aulasPorSemana, dias, diaEHorario, linkDaAula } = request.body

    const { user = null, password = null } = request.query


    try {
        const registers = alunosModel
        const idRequest = request.params.id
        const bodyRequest = request.body
        const findRegister = registers.find(register => register.id == idRequest);


        const indice = registers.indexOf(findRegister);

        for (item of registers) {
            const update = {
                id: idRequest,
                nome: bodyRequest.nome || item.nome,
                nomeSocial: bodyRequest.nomeSocial || item.nomeSocial,
                nomeAfetivo: bodyRequest.nomeAfetivo || item.nomeAfetivo,
                idade: bodyRequest.idade || item.idade,
                dataNascimento: bodyRequest.dataNascimento || item.dataNascimento,
                CPF: bodyRequest.CPF || item.CPF,
                endereco: bodyRequest.endereco || item.endereco,
                telefone: bodyRequest.telefone || item.telefone,
                email: bodyRequest.email || item.email,
                localDeTrabalho: bodyRequest.localDeTrabalho || item.localDeTrabalho,
                localDeEstudo: bodyRequest.localDeEstudo || item.localDeEstudo,
                dataDeInicio: bodyRequest.dataDeInicio || item.dataDeInicio,
                mensalidade: bodyRequest.mensalidade || item.mensalidade,
                aulasPorSemana: bodyRequest.aulasPorSemana || item.aulasPorSemana,
                dias: bodyRequest.dia || item.dias,
                diaEHorario: bodyRequest.diaEHorario || item.diaEHorario,
                linkDaAula: bodyRequest.linkDaAula || item.linkDaAula

            }
            registers.splice(indice, 1, update);

        }


        const updateStudent = {
            idRequest, nome, idade, dataNascimento, CPF, endereco, telefone, email, dataDeInicio, mensalidade, aulasPorSemana, dias, diaEHorario, linkDaAula
        };

        const keys = Object.keys(updateStudent)
        keys.forEach(key => {
            if (!updateStudent[key]) {
                throw {
                    statusCode: 406,
                    message: `Não foi possível atualizar cadastro: ${idRequest}. Todos os itens devem ser preenchidos.`,
                    details: `Para atualizar cadastro, é preciso preencher todos os dados.`
                };
            };
        });


        if (findRegister == undefined) {
            throw {
                statusCode: 404,
                message: "Não encontramos resultados com essa busca em nossos cadastros.",
                details: `Em nosso banco de dados, não existem cadastros com o id: ${idRequest}.`,
                params: request.params
            }
        }

        response.status(200).json([{
            "Mensagem": "Cadastro atualizado com sucesso",
            "Cadastro atualizado": registers[idRequest - 1],
            "Lista de cadastros": registers
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
    const { user = null, password = null } = request.query
    try {
        const registers = alunosModel
        const findRegister = registers.find(register => register.id == id);

        const indice = alunosModel.indexOf(findRegister);
        let cadastroRemovido = registers.splice(indice, 1);

        if (findRegister == undefined) {
            throw {
                statusCode: 404,
                message: "Não encontramos resultados com essa busca em nossos cadastros.",
                details: `Em nosso banco de dados, não existem cadastros com o id: ${id}.`,
                params: request.params
            }
        }
        response.status(200).send({
            "Mensagem": "Cadastro deletado com sucesso",
            "Cadastro deletado": cadastroRemovido,
            "Lista de alunos": registers

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
        const registers = alunosModel
        const idRequest = request.params.id
        const bodyRequest = request.body

        const findRegister = registers.find(register => register.id == idRequest);


        const itemEncontrado = Object.keys(bodyRequest);

        itemEncontrado.forEach(key => {
            findRegister[key] = bodyRequest[key];
        });



        if (findRegister == undefined) {
            throw {
                statusCode: 404,
                message: "Não encontramos resultados com essa busca em nossos cadastros.",
                details: `Em nosso banco de dados, não existem cadastros com o id: ${idRequest}.`,
                params: request.params
            }
        }
        response.status(200).json([{
            "Mensagem": "Cadastro atualizado com sucesso",
            "Cadastro atualizado": findRegister,
            "Lista de alunos": registers
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
    findAllPrivateRegisters,
    findPrivateRegistersById,
    findByName,
    getClassPriceList,
    getCPFList,
    createNewRegister,
    updateAll,
    deleteById,
    updateAnyItem
}